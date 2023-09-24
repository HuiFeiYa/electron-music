import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { initIpcMain } from './ipcMain'
import clc from 'cli-color'
const log = (text) => {
  console.log(`${clc.blueBright('[background.js]')} ${text}`)
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log(1, process.env['ELECTRON_RENDERER_URL'])
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    console.log(2)
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on('window-new', (e, data) => {
    console.log(data)
  })
  ipcMain.on('setTitle', (e, data) => {
    const child = new BrowserWindow({ parent: mainWindow, modal: true })
    child.loadURL('http://127.0.0.1:5174/')
    child.show()
    console.log('setTitle', data, child)
  })
}


// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
class Background {
  constructor() {
    this.init()
  }
  init() {
    log('initializing')
    this.handleAppEvents()
  }
  handleAppEvents() {
    app.on('ready', async () => {
      log('app ready event')
      initIpcMain()
      this.createWindow()
    })
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  }
  createWindow() {
    log('creating app window')
    const options = {
      width: 900,
      height: 670,
      titleBarStyle: 'hiddenInset',
      title: 'yun music',
      show: false,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    }
    this.window = new BrowserWindow(options)
    this.window.on('ready-to-show', () => {
      this.window.show()
    })

    this.window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
    this.window.setMenuBarVisibility(false)

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      console.log(1, process.env['ELECTRON_RENDERER_URL'])
      this.window.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      console.log(2)
      this.window.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }
}

new Background()
