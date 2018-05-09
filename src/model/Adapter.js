const AdapterField = function (runners, valueCtrlFunc, transferValueFunc, textCtrlFunc) {
    this.runners = runners;
    this.getValueCtrl = valueCtrlFunc;
    this.getTextCtrl = textCtrlFunc || valueCtrlFunc;
    this.transferCtrl = transferValueFunc;
};

AdapterField.prototype.set = function (value) {
    return new Promise((resolve, reject) => {
        if (typeof (this.transferValueFunc) === Function) {
            this.transferValueFunc(trasnferredValue)
                .then(val => {
                    this.getValueControl()
                        .then(ctrl => {
                            ctrl.value = trasnferredValue;
                        })
                        .catch(error => {
                            reject(error);
                        });

                })
        } else {
            this.getValueControl()
                .then(ctrl => {
                    ctrl.value = value;
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
};

AdapterField.prototype.getText = function () {
    return new Promise((resolve, resolve) => {
        this.getTextControl()
            .then(ctrl => {
                resolve(ctrl.value);
            })
            .cathch(error => {
                resolve(error);
            });
    });
};

AdapterField.prototype.getValue = function () {
    return new Promise((resolve, resolve) => {
        this.getValueControl()
            .then(ctrl => {
                resolve(ctrl.value);
            })
            .cathch(error => {
                resolve(error);
            });
    });
};


export default AdapterField;