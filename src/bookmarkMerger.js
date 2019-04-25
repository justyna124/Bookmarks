const fs = require('fs');
const jquery = require('jquery');
const jsdom = require('jsdom');
const html2json = require('html2json').html2json;

function readFiles(pathA, pathB) {
    const htmlA = fs.readFileSync(pathA).toString();
    const htmlB = fs.readFileSync(pathB).toString();
    return {
        htmlA,
        htmlB
    }
}

function cleanupMarkup(htmlString) {
    const $ = jquery(new jsdom.JSDOM(htmlString).window);
    $('p').remove();
    return $('body')[0].outerHTML;
}

function convertToJSON(htmlString) {
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

    const json = html2json(htmlString);
    return listDirectory(json.child[0], null).children[0];
}

function mergeRecursive(obj1, obj2) {
    if (Array.isArray(obj2) && obj2.length) {
        if (!Array.isArray(obj1)) {
            return obj2;
        }
        const result = [];
        while (obj2.length) {
            const item2 = obj2.shift();
            let sameItem1Index;
            for (let i = 0; i < obj1.length; i++) {
                if (item2.text && item2.text === obj1[i].text) {
                    sameItem1Index = i;
                }
            }
            if (null != sameItem1Index) {
                const item1Arr = obj1.splice(sameItem1Index, 1);
                result.push(mergeRecursive(item1Arr[0], item2));
            } else {
                result.push(item2);
            }
        }
        return result.concat(obj1);
    } else if ('object' === typeof obj2) {
        obj1 = !Array.isArray(obj1) && 'object' === typeof obj1 ? obj1 : {};
        for (const key in obj2) {
            obj1[key] = mergeRecursive(obj1[key], obj2[key])
        }
        return obj1;
    } else {
        return obj2
    }
}

function convertJsonToHtml(obj) {
    let result = '';
    if (obj.text && obj.attr) {
        for (let i in obj.attr) {
            if (obj.attr.href) {
                const icon = obj.attr.icon ? `ICON="${obj.attr.icon}"` : '';
                return `\n <DT><A HREF="${obj.attr.href}" ADD_DATE="${obj.attr.add_date}" ${icon}>${obj.text || ''}</A></DT> \n `;
            }
        }
        result += `\n <DT><H3 ADD_DATE="${obj.attr.add_date || ''}" LAST_MODIFIED="${obj.attr.last_modified || ''}" PERSONAL_TOOLBAR_FOLDER="${obj.attr.personal_toolbar_folder || ''}">${obj.text}</H3></DT> \n`;
    }
    if (obj.children) {
        let childrens = '';
        obj.children.forEach((el) => {
            childrens += convertJsonToHtml(el);
        });
        result += `\n <DL>${childrens}</DL> \n`;
    }
    return result;
}

function convertJsonToBookmarkHTML(json) {
    const result = convertJsonToHtml(json);
    return wrapWithHeader(json.text, result);
}


function wrapWithHeader(title, result) {
    return `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<style>
A {display: block}
DL {
margin: 15px;
}
H3 {
margin-bottom: 0;
}
</style>
<H1>${title}</H1>${result}`;
}

function mergeFiles(pathA, pathB) {
    const {htmlA, htmlB} = readFiles(pathA, pathB);
    const [cleanHtmlA, cleanHtmlB] = [cleanupMarkup(htmlA), cleanupMarkup(htmlB)];
    const jsonA = convertToJSON(cleanHtmlA);
    const jsonB = convertToJSON(cleanHtmlB);
    const mergedJson = mergeRecursive(jsonA, jsonB);
    return convertJsonToBookmarkHTML(mergedJson);
}

module.exports = {
    mergeFiles
};