const CollectionView = function (size, getItemFunction) {
    this.subViews = [];

    var subPromises = [];
    for (let i = 0; i < size; i++) {
        subPromises.push(getItemFunction(i));
    }

    Promise.all(subPromises)
        .then(results => {
            this.subViews = results;
        }, error => {
            console.log(error);
            alert(error);
        });
}

export default CollectionView;