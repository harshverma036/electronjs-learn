const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;
let addWindow;

// listen for app to be ready
app.on("ready", () => {
  // create new window
  mainWindow = new BrowserWindow();
  // load html
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    })
  );

   // quit app
   mainWindow.on('closed', () => app.quit());

  // build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert manu
  Menu.setApplicationMenu(mainMenu);
});

// handle create add window
const createAddWindow = () => {
  // create new window
  addWindow = new BrowserWindow({
      width: 300,
      height: 200,
      title: 'Add shopping list item'
  });
  // load html
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "addWindow.html"),
      protocol: "file",
      slashes: true,
    })
  );

  // build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert manu
  Menu.setApplicationMenu(mainMenu);
};

// create menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        click: () => createAddWindow(),
      },
      {
        label: "Clear Item",
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command + Q" : "Ctrl + Q",
        click: () => app.quit(),
      },
    ],
  },
];
