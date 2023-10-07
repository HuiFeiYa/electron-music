import { ipcMain } from 'electron'
import { createWindow } from './window'
import { createMenu } from './menu'
import background from './index'
export function initIpcMain() {
  ipcMain.on('openWindow', (event, path) => {
    console.log('on----', path)
    createWindow(background.window, path)
  })

  ipcMain.on('resize', (event, type) => {
    const window = background.window
    console.log('type', type)
    if (window.isMaximized()) { // 是否为最大化
      window.restore()
      window.webContents.send('isMaximized', window.isMaximized())
      return 
    }
    switch (type) {
      case 'maximize': {
        window.maximize()
        break
      }
      case 'unmaximize': {
        window.unmaximize()
        break
      }
      case 'minimize': {
        window.minimize()
        break;
      }
    }
    window.webContents.send('isMaximized', window.isMaximized())
  })

  ipcMain.on('menu-setting', () => {
    console.log('menu-setting')
    const window = background.window
    createMenu(window)
  })

  ipcMain.on('login', () => {
    createWindow(background.window, 'login')
  })
}
