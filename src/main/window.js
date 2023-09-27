import { BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'
export const createWindow = (parent, path) => {
  const options = {
    parent,
    width: 300,
    height: 200,
    titleBarStyle: 'hiddenInset',
    title: 'yun music',
    show: true,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      sandbox: false
    }
  }
  const win = new BrowserWindow(options)
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    const url = process.env['ELECTRON_RENDERER_URL'] + '/#/' + path
    console.log(1, url)
    win.loadURL(url)
  } else {
    const filePath = join(__dirname, '../renderer/index.html')
    console.log(2, is.dev, filePath)

    win.loadFile(filePath, {
      hash: path
    })
  }
}
