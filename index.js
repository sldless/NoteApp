const { app, BrowserWindow } = require('electron');
const setupPug = require('electron-pug');
var fs = require('fs');
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
    fs.readFile('db.json',function(err,content){
      if(err) throw err;
      let data = JSON.parse(content);
      if (!data) {let notes = []; fs.writeFile('db.json',JSON.stringify(notes),function(err){if(err) throw err;});}
      //data.push({'title': 3})
      fs.writeFile('db.json',JSON.stringify(data),function(err){if(err) throw err;})});
    try {
       //fs.readFileSync('db.json', 'utf8')
      let pug = await setupPug({pretty: true}, {Notes:  [{'id': 1, 'title': 'Note 1', 'content': 'Note 1 content'}, {'id': 2, 'title': 'Note 2', 'content': 'Note 2 content'}] });
      
      pug.on('error', err => console.error('electron-pug error', err))
    } catch (err) {
      console.error('electron-pug error', err)
    }
    win.loadURL('http://localhost:3000')
    //win.loadFile('html/notesmenu.pug');
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
