let db;
const readyCallbacks = [];

// Store Imported Font Files

export default class DB {
  static onReady(callback) {
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
    request.onsuccess = (e) => {
      db = e.target.result;

      readyCallbacks.forEach((callback) => callback());
    };
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('filerefs')) {
        const objectStore = db.createObjectStore('filerefs', { keyPath: 'id' });
      }
    };
  }

  static async openFileChooser(options) {
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
      request.onerror = (e) => {
        console.error(e);
      };
    }

    return file_ref;
  }

  static async saveFilePreview(fileId, previewImage) {
    const transaction = db.transaction(['filerefs'], 'readonly');
    const request = transaction.objectStore('filerefs').get(fileId);
    request.onsuccess = async (e) => {
      const data = request.result;
      data.preview = previewImage;

      const transaction = db.transaction(['filerefs'], 'readwrite');
      const request2 = transaction.objectStore('filerefs').put(data);
      request2.onerror = (e) => {
        console.error(e);
      };
    };
  }

  static async getFilePreview(fileId) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['filerefs'], 'readonly');
      const request = transaction.objectStore('filerefs').get(fileId);
      request.onsuccess = async (e) => {
        const data = request.result;
        resolve(data.preview);
      };
      request.onerror = (err) => reject(err);
    });
  }

  static async getFileList() {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['filerefs'], 'readwrite');
      const request = transaction.objectStore('filerefs').getAll();
      request.onsuccess = () => resolve(event.target.result);
      request.onerror = (e) => {
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
        request2.onerror = (e) => {
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
        resolve();
      };
      request.onerror = async () => {
        reject();
      };
    });
  }
}
