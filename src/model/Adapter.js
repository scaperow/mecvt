const AdapterField = function (runner, getValueCtrl, transferValue, getTextCtrl = getValueCtrl) {
    this.runner = runner;
    this.getValueCtrl = getValueCtrl;
    this.getTextCtrl = getTextCtrl;
    this.transferCtrl = transferValue;
};

AdapterField.prototype.setValue = function (value) {
    return new Promise((resolve, reject) => {
        const setValueFunction = (val) => {
            this.getValueCtrl()
                .then(ctrl => {
                    ctrl.value = val;
                    resolve(val);
                })
                .catch(error => {
                    reject(error);
                });
        };

        if (typeof (this.transferValue) === Function) {
            this.transferValue(trasnferredValue)
                .then(val => {
                    setValueFunction(trasnferredValue);
                })
        } else {
            setValueFunction(value);
        }
    });
};


AdapterField.prototype.setText = function (value) {
    return new Promise((resolve, reject) => {
        const setTextFunction = (val) => {
            if (this.getTextCtrl instanceof Function) {
                this.getTextCtrl()
                    .then(ctrl => {
                        ctrl.value = val;
                        resolve(val);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                resolve();
            }
        };


        setTextFunction(value);
    });
};

AdapterField.prototype.getText = function () {
    return new Promise((resolve, reject) => {
        this.getTextCtrl()
            .then(ctrl => {
                resolve(ctrl.value);
            })
            .cathch(error => {
                reject(error);
            });
    });
};

AdapterField.prototype.getValue = function () {
    return new Promise((resolve, reject) => {
        this.getValueCtrl()
            .then(ctrl => {
                resolve(ctrl.value);
            })
            .cathch(error => {
                reject(error);
            });
    });
};


const AdapterCollection = function (getChildrensFunc, childFields) {
    this.getChildrens = getChildrensFunc;
    this.childFields = childFields;
};


export { AdapterField, AdapterCollection };