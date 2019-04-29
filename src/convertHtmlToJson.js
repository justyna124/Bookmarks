const html2json = require('html2json').html2json;

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

function convertHtmlToJson(htmlString) {
    const json = html2json(htmlString);
    return listDirectory(json.child[0], null).children[0];
}

module.exports = convertHtmlToJson;
