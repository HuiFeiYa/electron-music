import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openWindow: (path) => {
    console.log('path---', path)
    ipcRenderer.send('openWindow', path)
  },
  resize: (type) => {
    ipcRenderer.send('resize', type)
  },
  menuSetting: () => {
    ipcRenderer.send('menu-setting')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    // contextBridge.exposeInMainWorld('openWindow', (path) => ipcRenderer.send('openWindow', path))
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
