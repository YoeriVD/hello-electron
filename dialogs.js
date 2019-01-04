const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');
module.exports = {
  showMessage
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
