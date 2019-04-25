const html2json = require('html2json').html2json;
const fs = require('fs');
const _ = require('lodash');
const jsdom = require('jsdom');
// const input = fs.readFileSync('C:/Users/Lenovo/Desktop/bookmarks_18.04.2019.html').toString();
// const input1 = fs.readFileSync('C:/Users/Lenovo/Desktop/bookmarks_15.04.2019.html').toString();
// const $ = require('jquery')(new jsdom.JSDOM(input).window);
// const $1 = require('jquery')(new jsdom.JSDOM(input1).window);


// $('p').remove();
// $1('p').remove();
// const root = $('body');
// const root1 = $1('body');
// let json = html2json(root[0].outerHTML);
// let json1 = html2json(root1[0].outerHTML);

// function listDirectory(sourceNode, parentNode) {
//     let targetNode = {};
//     if (sourceNode.node === 'text') {
//         let trimmedText = sourceNode.text.trim();
//         if (trimmedText.length) {
//             if (undefined === parentNode.text) parentNode.text = '';
//             parentNode.text += trimmedText;
//         }
//         return null;
//     }
//     if (sourceNode.tag === 'h3' || sourceNode.tag === 'a' || sourceNode.tag === 'dl') {
//         targetNode = parentNode;
//     } else if (parentNode) {
//         parentNode.children = parentNode.children || [];
//         parentNode.children.push(targetNode);
//     }
//     if (sourceNode.attr) {
//
//         targetNode.attr = sourceNode.attr;
//     }
//     if (sourceNode.child) {
//         let convertedChild;
//         sourceNode.child.forEach(child => {
//
//             if (child.tag === 'dl' && convertedChild) {
//                 convertedChild = listDirectory(child, convertedChild) || convertedChild;
//             } else
//                 convertedChild = listDirectory(child, targetNode) || convertedChild;
//         });
//     }
//     return targetNode;
// }

// let convertedNode = listDirectory(json.child[0], null).children[0];
// let convertedNode1 = listDirectory(json1.child[0], null).children[0];
// fs.writeFileSync('converted1.json', JSON.stringify(convertedNode));
//
// let stringifiedConvertedNode = JSON.stringify(convertedNode, null, 2);
// let stringifiedConvertedNode1 = JSON.stringify(convertedNode1, null, 2);

// function mergeRecursive(obj1, obj2) {
//     if (Array.isArray(obj2) && obj2.length) {
//         if (!Array.isArray(obj1)) {
//             return obj2;
//         }
//         const result = [];
//         while (obj2.length) {
//             const item2 = obj2.shift();
//             let sameItem1Index;
//             for (let i = 0; i < obj1.length; i++) {
//                 if (item2.text && item2.text === obj1[i].text) {
//                     sameItem1Index = i;
//                 }
//             }
//             if (null != sameItem1Index) {
//                 const item1Arr = obj1.splice(sameItem1Index, 1);
//                 result.push(mergeRecursive(item1Arr[0], item2));
//             } else {
//                 result.push(item2);
//             }
//         }
//         return result.concat(obj1);
//     } else if ('object' === typeof obj2) {
//         obj1 = !Array.isArray(obj1) && 'object' === typeof obj1 ? obj1 : {};
//         for (const key in obj2) {
//             obj1[key] = mergeRecursive(obj1[key], obj2[key])
//         }
//         return obj1;
//     } else {
//         return obj2
//     }
// }

fs.writeFileSync('convertedNode1.json', JSON.stringify(convertedNode));
fs.writeFileSync('convertedNode2.json', JSON.stringify(convertedNode1));

// const rootMerge = mergeRecursive(convertedNode, convertedNode1);

// fs.writeFileSync('converted.json', JSON.stringify(rootMerge));

module.exports = {
    // mergeRecursive,
    // json,
    // json1,

};

