const bookmarkMerger = require('./bookmarkMerger');
// const pathA = process.argv[2];
// const pathB = process.argv[3];
const pathA = 'C:/Users/Lenovo/Desktop/bookmarks_18.04.2019.html';
const pathB = 'C:/Users/Lenovo/Desktop/bookmarks_15.03.2019.html';

const result = bookmarkMerger.mergeFiles(pathA, pathB);

console.log(result);