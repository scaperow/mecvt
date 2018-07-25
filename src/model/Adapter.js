const AdapterField = function (options = {}) {
    this.view = options.view || $(document);
    let option = options;

    this.checkInstance = () => {
        if (option.getTextCtrl && !this.textCtrl) {
            this.textCtrl = option.getTextCtrl(this.view);
        }

        if (option.getValueCtrl && !this.valueCtrl) {
            this.valueCtrl = options.getValueCtrl(this.view);
        }

        if (option.getValue) {
            this.getValue = option.getValue;
        }

        if (option.getText) {
            this.getText = option.getText;
        }
    }

};

AdapterField.prototype.setValue = function (value) {
    this.checkInstance();
    this.valueCtrl.val(value);
};


AdapterField.prototype.setText = async function (value) {
    this.checkInstance();
    this.textCtrl.val(value);
};

AdapterField.prototype.getText = async function () {
    this.checkInstance();
    return this.textCtrl.text();
};

AdapterField.prototype.getValue = function () {
    this.checkInstance();
    return this.valueCtrl.val();
};



const AdapterCollection = function (size, fields) {
    this.size = size;
    this.fields = fields;
};


export {
    AdapterField,
    AdapterCollection
};