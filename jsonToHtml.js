const fs = require('fs');
const htmlToJson = require('./converted.json');

function generateHtml(obj) {
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
            childrens += generateHtml(el);
        });
        result += `\n <DL>${childrens}</DL> \n`;
    }
    return `${result}`;
}

let output = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
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
<H1>${htmlToJson.text}</H1>${generateHtml(htmlToJson)}`;

fs.writeFileSync('converted.html', output);