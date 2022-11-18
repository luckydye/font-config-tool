let db: any;
const readyCallbacks: Function[] = [];

// Store Imported Font Files

export default class DB {
  static onReady(callback: Function) {
    if (!db) {
      readyCallbacks.push(callback);
    } else {
      callback();
    }
  }

  static connectToDatabase() {
    const request = indexedDB.open('FileSystemDatabase');
    request.onerror = (e) => {
      console.error(e);
    };
    request.onsuccess = () => {
      db = request.result;

      readyCallbacks.forEach((callback) => callback());
    };
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('filerefs')) {
        const objectStore = db.createObjectStore('filerefs', { keyPath: 'id' });
      }
    };
  }

  static async openFileChooser(options: object) {
    // @ts-ignore
    const [file_ref] = await self.showOpenFilePicker(options);

    if (file_ref) {
      const transaction = db.transaction(['filerefs'], 'readwrite');
      const request = transaction.objectStore('filerefs').add({
        id: file_ref.name,
        created: Date.now(),
        lastOpened: Date.now(),
        preview: null,
        file: file_ref,
      });
      request.onerror = (e: any) => {
        console.error(e);
      };
    }

    return file_ref;
  }

  static async saveFilePreview(fileId: string, previewImage: string) {
    const transaction = db.transaction(['filerefs'], 'readonly');
    const request = transaction.objectStore('filerefs').get(fileId);
    request.onsuccess = async () => {
      const data = request.result;
      data.preview = previewImage;

      const transaction = db.transaction(['filerefs'], 'readwrite');
      const request2 = transaction.objectStore('filerefs').put(data);
      request2.onerror = (e: any) => {
        console.error(e);
      };
    };
  }

  static async getFilePreview(fileId: string) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['filerefs'], 'readonly');
      const request = transaction.objectStore('filerefs').get(fileId);
      request.onsuccess = async () => {
        const data = request.result;
        resolve(data.preview);
      };
      request.onerror = (err: Error) => reject(err);
    });
  }

  static async getFileList() {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['filerefs'], 'readwrite');
      const request = transaction.objectStore('filerefs').getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e: any) => {
        console.error(e);
        reject();
      };
    });
  }

  static async openFileById(file_id = '123') {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['filerefs'], 'readonly');
      const request = transaction.objectStore('filerefs').get(file_id);
      request.onsuccess = async () => {
        const data = request.result;
        data.lastOpened = Date.now();

        const transaction = db.transaction(['filerefs'], 'readwrite');
        const request2 = transaction.objectStore('filerefs').put(data);
        request2.onerror = (e: any) => {
          console.error(e);
          reject();
        };

        const ref = data.file;

        if (await ref.requestPermission() != 'granted') {
          return;
        }

        resolve(ref);
      };
    });
  }

  static async removeFileById(file_id = '123') {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['filerefs'], 'readwrite');
      const request = transaction.objectStore('filerefs').delete(file_id);
      request.onsuccess = async () => {
        resolve(1);
      };
      request.onerror = async () => {
        reject();
      };
    });
  }
}
