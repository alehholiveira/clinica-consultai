import { app, BrowserWindow } from 'electron'

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      enableRemoteModule: true
    }
  })

  win.loadURL('http://localhost:30000/login-app')
}

app.whenReady().then(createWindow)