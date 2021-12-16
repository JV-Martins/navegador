const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(config.url)
}

function toggleDevTools() {
    mainWindow.webContents.toggleDevTools()
}

function createShortcuts() {
    globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

app.whenReady().then(() => {
    createWindow()
    createShortcuts()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
