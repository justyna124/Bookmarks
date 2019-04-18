var html2json = require('html2json').html2json;
var json2html = require('node-json2html');
var fs = require('fs');
var _ = require('lodash');

const jsdom = require('jsdom');
var mergeJSON = require("merge-json");

const $ = require('jquery')(new jsdom.JSDOM(fs.readFileSync('C:/Users/Lenovo/Desktop/bookmarks_15.03.2019.html').toString()).window);
const $1 = require('jquery')(new jsdom.JSDOM(fs.readFileSync('C:/Users/Lenovo/Desktop/bookmarks_14.03.2019.html').toString()).window);

$('p').remove();
$1('p').remove();
const root = $('body');
const root1 = $1('body');
// console.log(root)

let json = html2json(root[0].outerHTML);
let json1 = html2json(root1[0].outerHTML);
// console.log(json1);
// fs.writeFileSync('fixed.html', root[0].outerHTML);

function listDirectory(sourceNode, parentNode) {
    let targetNode = {};
    if (sourceNode.node === 'text') {
        let trimmedText = sourceNode.text.trim();
        if (trimmedText.length) {
            if (undefined === parentNode.text) parentNode.text = '';
            parentNode.text += trimmedText;
        }
        return null;
    }
    if (sourceNode.tag === 'h3' || sourceNode.tag === 'a' || sourceNode.tag === 'dl') {
        targetNode = parentNode;
    } else if (parentNode) {
        parentNode.children = parentNode.children || [];
        parentNode.children.push(targetNode);
    }
    if (sourceNode.attr) {

        targetNode.attr = sourceNode.attr;
    }
    if (sourceNode.child) {
        let convertedChild;
        sourceNode.child.forEach(child => {

            if (child.tag === 'dl' && convertedChild) {

                convertedChild = listDirectory(child, convertedChild) || convertedChild;
            } else
                convertedChild = listDirectory(child, targetNode) || convertedChild;
        });
    }
    return targetNode;
}

let convertedNode = listDirectory(json.child[0], null).children[0];
let convertedNode1 = listDirectory(json1.child[0], null).children[0];
// console.log('CN', JSON.stringify(convertedNode));
fs.writeFileSync('converted1.json', JSON.stringify(convertedNode));

let stringifiedConvertedNode = JSON.stringify(convertedNode, null, 2);
let stringifiedConvertedNode1 = JSON.stringify(convertedNode1, null, 2);

// console.log('string',stringifiedConvertedNode1);


// function isPrimitive(sourceValue) {
//     return sourceValue instanceof String || 'string' === typeof sourceValue || 'number' === typeof sourceValue;
// }
//
//
// function mergeRecursive(target, source) {
//     // const result=[];
//     // const currentItem = target.pop();
//     //
//     // if currentItem.text == findedItemFromSource.text => result.push({
//     // text: curentItem.text,
//     // children: mergeRecursove(currentItem.children, findedItemFromSource.children)})
//     // else result.push(currentItem);
//
//     for (const key in source) {
//
//         if (!source.hasOwnProperty(key))
//             continue;
//         let sourceValue = source[key];
//         let targetValue = target[key];
//         if (null == targetValue) {
//             target[key] = sourceValue;
//             continue;
//         }
//         if (_.isEqual(targetValue, sourceValue)) {
//             continue;
//         }
//         if (Array.isArray(sourceValue)) {
//             if (!Array.isArray(targetValue)) {
//                 target[key] = sourceValue;
//             } else {
//                 //    TODO handle array
//                 // let resultJson = [];
//                 //
//                 // let popValue = targetValue.pop();
//                 // console.log('item',popValue)
//                 // let mergedArray = targetValue.concat(sourceValue);
//                 // // console.log('merge',mergedArray)
//                 // // let removeDuplicates = [...new Set(mergedArray)];
//                 // var removeDuplicates = mergedArray.filter(function (item, pos) {return mergedArray.indexOf(item) == pos});
//                 // console.log('rd',removeDuplicates)
//                 // target[key]=removeDuplicates;
//                 // for (let key in sourceValue) {
//                 //     // console.log(sourceValue[item])
//                 //     console.log(popValue.text)
//                 //     console.log(sourceValue[1].text)
//                     // console.log(sourceValue.hasOwnProperty(key))
//                     // if(popValue.text==item.text){
//                     //     // mergeRecursive(targetValue, sourceValue);
//                     //     resultArray.push(popValue,)
//                     // }
//                     // // sourceValue.hasOwnProperty(key)
//                     // if (popValue.text == sourceValue[1].text) {
//                     //     targetValue[key] = sourceValue[key];
//                     //     resultArray.push(targetValue[key]);
//                     //     console.log('ra', resultArray);
//                     }
//
//                 mergeRecursive(targetValue, sourceValue);
//             }
//       else if (isPrimitive(sourceValue)) {
//             target[key] = sourceValue;
//         } else {
//             if (!Array.isArray(targetValue) && !isPrimitive(targetValue)) {
//                 // console.log('1111');
//                 mergeRecursive(targetValue, sourceValue);
//             } else {
//                 // console.log('222');
//                 target[key] = sourceValue;
//             }
//         }
//     }
//     return target;
// }


// function mergeRecursive(target, source) {
//     const result=[];
//     const currentItem = target.pop();

// if currentItem.text == findedItemFromSource.text => result.push({
// text: curentItem.text,
// children: mergeRecursove(currentItem.children, findedItemFromSource.children)})
// else result.push(currentItem);

function mergeRecursive(obj1, obj2) {

    // console.log('obj1', obj1);
    // console.log('obj2', obj2);


    for (const key in obj2) {
        console.log('key', obj2[key]);
        if (Array.isArray(obj2[key]) && obj2[key].length) {
            const result = [];
            while (obj2[key].length) {
                const item2 = obj2[key].shift();
                console.log('i2',item2)
                let sameItem1Index;
                for (let i = 0; i < obj1[key].length; i++) {
                    if (item2.text == obj1[key][i].text) {
                        sameItem1Index = i;
                    }
                }
                if (null != sameItem1Index) {
                    const item1Arr = obj1[key].splice(sameItem1Index, 1);
                    result.push(mergeRecursive(item1Arr[0], item2));
                } else {
                    result.push(item2);
                }
                console.log('end iteration', result)
            }
            obj1[key] = result.concat(obj1[key]);
            console.log('1 - end\n')
        } else if ('object' === typeof obj2[key]) {
            console.log('2')
            obj1[key] = !Array.isArray(obj1[key]) && 'object' === typeof obj1[key] ?  obj1[key] : {};
            obj1[key] = mergeRecursive(obj1[key], obj2[key])
        } else {
            console.log('3')
            obj1[key] = obj2[key];
        }
    }
    console.log(obj1);
    return obj1;
}

// const rootMerge = mergeRecursive(stringifiedConvertedNode, stringifiedConvertedNode1);
// const rootMerge = mergeRecursive(convertedNode, convertedNode1);
// console.log(rootMerge)




// fs.writeFileSync('converted.json', stringifiedConvertedNode1);
// fs.writeFileSync('converted.json', JSON.stringify(rootMerge));
// fs.writeFileSync('converted.json', rootMerge);


module.exports = {
    mergeRecursive
};