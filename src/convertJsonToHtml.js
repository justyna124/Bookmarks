function convertJsonToHtml(obj) {
    let result = '';

    const tagName = obj.attr && obj.attr.href ? 'A' : 'H3';
    result += `\n <DT><${tagName}`;
    if (obj.attr) {
        Object.keys(obj.attr).forEach(key => (result += ` ${key}="${obj.attr[key]}"`));
        result += `>${obj.text}</${tagName}></DT> \n`;
    }

    if (obj.children) {
        let childrens = '';
        obj.children.forEach((el) => {
            childrens += convertJsonToHtml(el);
        });
        result += `\n <DL>${childrens}</DL> \n`;
    }
    return `${result}`;
}

module.exports = convertJsonToHtml;
