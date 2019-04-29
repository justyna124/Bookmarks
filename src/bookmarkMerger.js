const jquery = require('jquery');
const jsdom = require('jsdom');
const readFiles = require('./readFiles.js');
const convertHtmlToJson = require('./convertHtmlToJson.js');
const mergeRecursive = require('./mergeRecursive');
const convertJsonToBookmarkHtml = require('./convertJsonToBookmarkHtml');

function cleanupMarkup(htmlString) {
    const $ = jquery(new jsdom.JSDOM(htmlString).window);
    $('p').remove();
    return $('body')[0].outerHTML;
}

function mergeFiles(pathA, pathB) {
    const {htmlA, htmlB} = readFiles(pathA, pathB);
    const [jsonA, jsonB] = [convertHtmlToJson(cleanupMarkup(htmlA)), convertHtmlToJson(cleanupMarkup(htmlB))];
    const mergedJson = mergeRecursive(jsonA, jsonB);
    return convertJsonToBookmarkHtml(mergedJson);
}

module.exports = {
    mergeFiles
};