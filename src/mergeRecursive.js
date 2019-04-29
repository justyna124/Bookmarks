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

module.exports = mergeRecursive;
