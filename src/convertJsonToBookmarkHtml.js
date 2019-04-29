const convertJsonToHtml = require('./convertJsonToHtml');

function convertJsonToBookmarkHtml(json) {
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

module.exports = convertJsonToBookmarkHtml;