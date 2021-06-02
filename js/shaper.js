'use strict'

const electron = require('electron')
const clipboard = electron.clipboard
const remote = electron.remote

function shapeText(text) {
    let out = text.replace(/-\s/g, "").replace(/-\n/g, "").replace(/\r\n/g, " ").replace(/\n/g, " ")
    console.log(text)
    console.log(out)
    return out
}

document.addEventListener('DOMContentLoaded', () => {
    let clip = clipboard.readText()
    let box = document.getElementById('clipContents')
    box.value = shapeText(clip)
})