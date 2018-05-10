const AdapterField = function (runners, valueCtrlFunc, transferValueFunc, textCtrlFunc = valueCtrlFunc) {
    this.runners = runners;
    this.getValueCtrl = valueCtrlFunc;
    this.getTextCtrl = textCtrlFunc;
    this.transferCtrl = transferValueFunc;
};

AdapterField.prototype.setValue = function (value) {
    return new Promise((resolve, reject) => {
        const setValueFunction = (val) => {
            this.getValueCtrl()
                .then(ctrl => {
                    ctrl.value = val;
                })
                .catch(error => {
                    reject(error);
                });
        };

        if (typeof (this.transferValueFunc) === Function) {
            this.transferValueFunc(trasnferredValue)
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
    return new Promise((resolve, resolve) => {
        this.getTextCtrl()
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
        this.getValueCtrl()
            .then(ctrl => {
                resolve(ctrl.value);
            })
            .cathch(error => {
                resolve(error);
            });
    });
};


const AdapterCollection = function ({length}) {
    
};

export default AdapterField;