function makeTags(list) {
    var tags = [];
    for(var i=0; i<list.length; i++) {
        tags[list[i]] = i;
    }
    return tags;
}
