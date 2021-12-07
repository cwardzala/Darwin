let idCounter = 0;
export const uniqueId = (prefix) => {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
};

export const getRandomInt = (min, max) => {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

export const getHighest = (memo, item) => {
    if (!memo || memo.score < item?.score) {
        return item;
    }

    return memo;
};
export const getLowest = (memo, item) => {
    if (!memo || memo.score > item.score) {
        return item;
    }

    return memo;
};
export const getCycleSet = (group, cycle) => {
    if (!group.length) {
        return group;
    }
    return group.map(function (item) {
        if (item.birth === cycle) {
            return item;
        }
    });
};
export const coinFlip = () => {
    return getRandomInt(1);
};
