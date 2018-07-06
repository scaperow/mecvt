const AdapterField = function (options = {}) {
    this.view = options.view || $(document);
    this.getValueCtrl = options.getValueCtrl;
    this.getTextCtrl = options.getTextCtrl;
    this.transferValue = options.transferValue;

};

AdapterField.prototype.setValue = async function (value) {
    const setValueFunction = (val) => {
        let ctrl = this.getValueCtrl(this.view).value;
        if (ctrl !== null && ctrl !== undefined) {
            ctrl.val(val);
        }

        return true;
    };
};


AdapterField.prototype.setText = async function (value) {
    if (this.getTextCtrl instanceof Function) {
        try {
            let ctrl = await this.getTextCtrl(this.view);

            ctrl.val(value);
            return true;

        } catch (error) {
            return Promise.reject(error);
        }
    } else {
        return Promise.reject('error function');
    }
};

AdapterField.prototype.getText = async function () {

    if (this.getTextCtrl instanceof Function) {
        try {
            let ctrl = await this.getTextCtrl(this.view);

            return ctrl.text();

        } catch (error) {
            return Promise.reject(error);
        }
    } else {
        return Promise.reject('error function');
    }
};

AdapterField.prototype.getValue = async function () {
    if (this.getValueCtrl instanceof Function) {
        try {
            let ctrl = await this.getValueCtrl(this.view);
            return ctrl.val();

        } catch (error) {
            return Promise.reject(error);
        }
    } else {
        return Promise.reject('error function');
    }
};


const AdapterCollection = function (size) {
    this.size = size;
};


export {
    AdapterField,
    AdapterCollection
};