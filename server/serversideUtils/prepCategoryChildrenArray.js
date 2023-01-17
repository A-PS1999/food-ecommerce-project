function prepCategoryChildrenArray(children) {
    const arrLength = children.ids.length;
    let resultArr = [];

    for (let i=1; i < arrLength; i++) {
        let obj = {};
        obj.id = children.ids[i];
        obj.name = children.names[i];
        resultArr.push(obj);
    }

    return resultArr;
}

module.exports = { prepCategoryChildrenArray };