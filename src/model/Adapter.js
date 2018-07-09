const AdapterField = function (options = {}) {
    this.view = options.view || $(document);
    this.getValueCtrl = options.getValueCtrl;
    this.getTextCtrl = options.getTextCtrl;
    this.transferValue = options.transferValue;


    if (options.getValue instanceof Function) {
        this.getValue = options.getValue;
    }
};

AdapterField.prototype.setValue = async function (value) {
    let ctrl = this.getValueCtrl(this.view).value;
    if (ctrl !== null && ctrl !== undefined) {
        ctrl.val(val);
    }

    return true;
};


AdapterField.prototype.setText = async function (value) {
    try {
        let ctrl = await this.getTextCtrl(this.view);

        ctrl.val(value);
        return true;

    } catch (error) {
        return Promise.reject(error);
    }
};

AdapterField.prototype.getText = async function () {
    try {
        let ctrl = await this.getTextCtrl(this.view);

        return ctrl.text();

    } catch (error) {
        return Promise.reject(error);
    }
};

AdapterField.prototype.getValue = async function () {
    try {
        let ctrl = await this.getValueCtrl(this.view);
        return ctrl.val();

    } catch (error) {
        return Promise.reject(error);
    }
};


const AdapterCollection = function (size) {
    this.size = size;
};


export {
    AdapterField,
    AdapterCollection
};