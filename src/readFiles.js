const fs = require('fs');

function readFiles(pathA, pathB) {
    const htmlA = fs.readFileSync(pathA).toString();
    const htmlB = fs.readFileSync(pathB).toString();
    return {
        htmlA,
        htmlB
    }
}

module.exports = readFiles;