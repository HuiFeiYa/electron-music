import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { initIpcMain } from './ipcMain'
import clc from 'cli-color'
const log = (text) => {
  console.log(`${clc.blueBright('[background.js]')} ${text}`)
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
      installExtension(VUEJS3_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    })
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
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
      const filePath = join(__dirname, '../renderer/index.html')
      console.log(2, is.dev, filePath)
      this.window.loadFile(filePath, {
        hash: 'home'
      })
    }
  }
}

export default new Background()
