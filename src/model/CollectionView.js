const CollectionView = function (size, getItemFunction) {
    this.size = size;
    this.getItems = getItemFunction;
    this.subViews = [];

    this.constructor = () => {
        var subPromises = [];
        for (let i = 0; i < this.size; i++) {
            subPromises.push(this.getItems(i));
        }

        Promise.all(subPromises)
            .then(results => {
                this.subViews = results;
                return Promise.resolve(this.subViews);
            }, error => {
                console.log(error);
                return Promise.reject(error);
            });

    };
}




export default CollectionView;