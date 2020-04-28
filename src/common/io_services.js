const fs = require('fs');
const path = require('path');
const readInputFile = function (fileName) {
    const filePath = path.join(__dirname, `../../input/${fileName}`);
    const contents = fs.readFileSync(filePath, 'utf8');
    const data = contents.split('\n');
    return data.map(item => item.split(" "));
}
module.exports.readInputFile = readInputFile