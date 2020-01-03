const electron = require("electron");
const path = require("path");
const fs = require("fs");
const isDev = require("electron-is-dev");
require("electron-reload");

const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js"
    }
  });

  mainWindow.maximize();
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// ipcMain.on("getDir", (event, arg) => {
//   console.log(arg);
//   event.reply("dirReply", "selecting dir");
// });

ipcMain.on("getDir", async (event, arg) => {
  console.log("GET DIR HIT");
  const data = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"]
  });
  event.reply("dirReply", data);
});

ipcMain.on("setDir", async (event, arg) => {
  console.log("SET DIR HIT");
  console.log(arg);
  event.reply("dirReply", { filePaths: [arg] });
});

ipcMain.on("getContents", (event, arg) => {
  console.log("GET CONTENTS EVENT HIT");
  console.log(arg);
  const data = fs.readdirSync(arg);
  const data2 = data.map(item => {
    const stat = fs.statSync(`${arg}\\${item}`);
    return {
      item: `${arg}\\${item}`,
      file: stat.isFile(),
      directory: stat.isDirectory()
    };
  });
  event.reply("dirContents", data2);
});
