import { app, BrowserWindow } from 'electron'

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadURL('http://localhost:8000')
}

app.whenReady().then(createWindow)
