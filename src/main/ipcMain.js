import { ipcMain } from 'electron'
import { createWindow } from './window'
import background from './index'
export function initIpcMain() {
  ipcMain.on('openWindow', (event, path) => {
    console.log('on----', path)
    createWindow(background.window, path)
  })

  ipcMain.on('resize', (event, type) => {
    const window = background.window
    console.log('type', window, type)
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
  })
}
