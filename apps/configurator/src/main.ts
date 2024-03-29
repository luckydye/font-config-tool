import '../index.html';
import '../configurator.css';

// shared components
import 'ui/components/Button.ts';
import 'ui/components/ChildSelector.ts';
import 'ui/components/Switch.ts';
import UINotification from 'ui/components/UINotification';
// app components
import './components/Text.ts';
import './components/AppState.ts';
import './components/DocumentSizer.ts';
import './components/ConfigPanel.ts';
import './components/SidePanel.ts';
import './components/ActionButton.ts';
import { Action } from './app/Action';
import Fonts from './app/Fonts';
import State from './app/State';


Action.register({
  name: "tool.uploadfont",
  onAction() {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = async () => {
      try {
        const file = input.files ? input.files[0] : null;
        if(file) {
          const buffer = await file.arrayBuffer();
          const blob = new Blob([ buffer ]);
          const url = URL.createObjectURL(blob);
          const font = await Fonts.register(url);
          console.log(font);

          new UINotification({ text: `${font?.family} successfully imported.` }).show();
        }
      } catch(err) {
        console.error(err);
        new UINotification({ text: `Failed to import selected file.` }).show();
      }
    }
    input.click();
  }
})

Action.register({
  name: "tool.reset",
  onAction() {
    State.reset();
  }
})
