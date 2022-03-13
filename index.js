const { app, BrowserWindow } = require('electron');
const setupPug = require('electron-pug');
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

var db = new JsonDB(new Config("db", true, false, '/'));

const createWindow = async () => {
    // Create the browser window.
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
      db.getData('/' + process.env.COMPUTERNAME)
    } catch (err) {
      db.push('/' + process.env.COMPUTERNAME, { notes: [{'test': 'e'}] });
    }
    try {
      let pug = await setupPug({pretty: true}, {notes: db.getData('/'+process.env.COMPUTERNAME)})
      
      pug.on('error', err => console.error('electron-pug error', err))
    } catch (err) {
      console.error('electron-pug error', err)
    }
    win.loadFile('html/notesmenu.pug');
    }



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

 app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
