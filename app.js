import electron , { app, BrowserWindow } from 'electron'

let mainWindow = null

let argsCmd = process.argv.slice(2);
let timerTime = parseInt(argsCmd[0]);

const createWindow = () => {

  console.log('The application is ready.')

  mainWindow = new BrowserWindow({width: 360, height: 240, frame: false})

  mainWindow.loadURL('file://'+ __dirname + '/src/index.html')

  // mainWindow.webContents.openDevTools()
  
  mainWindow.on('closed', function() {
    mainWindow = null
  })
  
  // When UI has finish loading
  mainWindow.webContents.on('did-finish-load', () => {
      // Send the timer value
      mainWindow.webContents.send('timer-change', timerTime);
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin')
    app.quit()
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
  if (win === null)
    createWindow()
});
