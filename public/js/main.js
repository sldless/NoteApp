const { JsonDB } = require('node-json-db/')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

var db = new JsonDB(new Config("../db.json", true, false, '/'));

function openPopup() {
    document.getElementById("Popup").style.display = "block";
    if (document.getElementById("Popup").opened == true) {
      document.getElementById("Popup").style.display = "none";
    }
    document.getElementById("Popup").opened = true;
  }
  
function closePopup() {
    document.getElementById("Popup").style.display = "none";
    if (document.getElementById("Popup").opened) {
      document.getElementById("Popup").opened = false;
    }
    var note = document.getElementById('note').value
    var notes = db.getData('/' + process.env.COMPUTERNAME).notes;
    notes.push({'note': note});
    db.push('/' + process.env.COMPUTERNAME, { notes: notes });
  }
//https://www.w3schools.com/howto/howto_js_popup_form.asp