const CollectionView = function (size, getItemFunction) {
    this.subViews = [];
    this.subPromises = [];
    for (let i = 0; i < size; i++) {
        this.subPromises.push(getItemFunction(i));
    }

    Promise.all(subPromises)
        .then(results => {
            this.subViews = results;
        }, error => {
            alert(error);
        });
}

export default CollectionView;