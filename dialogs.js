const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');
module.exports = {
  showMessage,
  showSaveDialog,
  showOpenDialog
};
function showMessage(browserWindow) {
  dialog.showMessageBox(
    browserWindow,
    {
      type: 'info',
      icon: nativeImage.createFromPath('./kitten.jpg'),
      message: 'Hello',
      detail: 'just a friendly meow.',
      buttons: ['Meow', 'Close'],
      defaultId: 0
    },
    //not passing this function makes the dialog sync iso async
    clickIndex => {
      console.log(clickIndex);
    }
  );
}

function showSaveDialog(browserWindow) {
  dialog.showSaveDialog(
    browserWindow,
    {
      defaultPath: path.join(app.getPath('downloads'), 'memory-info.json')
    },
    fileName => {
      if (fileName) {
        const memInfo = JSON.stringify(process.memoryUsage(), null, 2);
        fs.writeFile(fileName, memInfo, 'utf8', err => {
          if (err) {
            dialog.showErrorBox('Save failed.', err.message);
          }
        });
      }
    }
  );
}

function showOpenDialog(browserWindow) {
  dialog.showOpenDialog(
    browserWindow,
    {
      defaultPath: app.getPath('downloads'),
      filters: [
        {
          name: 'Text files',
          extensions: ['txt']
        }
      ]
    },
    filePaths => {
      if (filePaths) {
        console.log(filePaths, fs.readFileSync(filePaths[0], 'utf8'));
      }
    }
  );
}
