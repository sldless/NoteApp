const { app, BrowserWindow } = require('electron');
const setupPug = require('electron-pug');
var fs = require('fs');
const createWindow = async () => {
  const win = new BrowserWindow({
    width: 400,
    height: 650,
    autoHideMenuBar: true,
    draggable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  try {
    let pug = await setupPug({pretty: true});
    pug.on('error', err => console.error('electron-pug error', err))
  } catch (err) {
    console.error('electron-pug error', err)
  }
  win.loadURL('http://localhost:7829')
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit(); 
  })

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
