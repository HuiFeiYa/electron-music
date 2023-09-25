import { Menu, MenuItem } from 'electron'
// import defaultShortcuts from './utils/shortcut.js';

// const isMac = process.platform === 'darwin'

export function createMenu() {
  const fileMenuItem = new MenuItem({
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click: () => {
          // 在这里处理点击 "Open" 菜单项的逻辑
        }
      },
      {
        label: 'Save',
        click: () => {
          // 在这里处理点击 "Save" 菜单项的逻辑
        }
      },
      { type: 'separator' }, // 分隔线
      {
        label: 'Exit',
        click: () => {
          
        }
      }
    ]
  })

  const menu = new Menu()
  menu.append(fileMenuItem) // 添加 "File" 菜单项
  // 添加其他菜单项...

  // 设置菜单栏
  Menu.setApplicationMenu(menu)
}
