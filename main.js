"use strict";

const { BrowserWindow, globalShortcut } = require("electron");
const electron = require("electron");
let tray = null; //GC防止
let onoff = true;
let clipWindow = null;

function createWindow() {
    if (clipWindow) {
        clipWindow.loadFile("./clip.html");
        clipWindow.show();
    } else {
        clipWindow = new BrowserWindow({
            frame: false,
            width: 400,
            height: 200,
            useContentSize: true,
            webPreferences: {
                nodeIntegration: false,
                preload: `${__dirname}/js/shaper.js`,
            }
        });
        clipWindow.setSkipTaskbar(true);
        clipWindow.loadFile("./clip.html");
        clipWindow.on('blur', () => {
            clipWindow.hide();
        });
        clipWindow.on('closed', () => {
            clipWindow = null;
        });
    }

    //clipWindow.webContents.openDevTools()
}

electron.app.on('ready', () => {
    //macならDockに表示しない
    if (process.platform === 'darwin') electron.app.dock.hide();

    tray = new electron.Tray(`${__dirname}/icon-16.${process.platform === 'win32' ? 'ico' : 'png'}`);
    tray.setContextMenu(electron.Menu.buildFromTemplate([
        {
            label: 'clip',
            click: () => {
                createWindow();
            }
        },
        {
            label: 'Info',
            click: () => {
                electron.dialog.showMessageBoxSync({
                    title: 'Information',
                    message: 'ClipShaper',
                    detail: `GitHub: @RMitsui`
                });
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Exit',
            role: 'quit'
        }
    ]));
    tray.setToolTip("ClipShaper");
    tray.on('click', function () {
        if (onoff) {
            onoff = false;
            globalShortcut.unregister('CmdOrCtrl+g');
        } else {
            onoff = true;
            globalShortcut.register('CmdOrCtrl+g', () => {
                createWindow();
            });
        }
    });
    globalShortcut.register('CmdOrCtrl+g', () => {
        createWindow();
    });
});

electron.app.on('will-quit', function () {
    globalShortcut.unregister('CmdOrCtrl+g');
    globalShortcut.unregisterAll();
});


