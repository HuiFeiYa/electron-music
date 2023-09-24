import { ipcMain } from 'electron'
import { createWindow } from './window'
import background from './index'
export function initIpcMain() {
  ipcMain.on('openWindow', (event, path) => {
    console.log('on----', path)
    createWindow(background.window, path)
  })
}
