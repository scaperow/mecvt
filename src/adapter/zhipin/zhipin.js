import AdapterField from '../../model/Adapter';
import ReadyService from '../../model/ReadyService';

const ClickBasicService = function () {

};
clickBasicService.prototype = ReadyService.prototype;
ClickBasicService.prototype.runner = function () {
    return new Promise((resolve, reject) => {
        $('.fz-resume.fz-edit').click();
        resolve();
    });
};

const ClickResumeService = function () {
    this.runner = function () {
        return new Promise((resolve, reject) => {
            $('.fz-resume.fz-edit').click();
            resolve();
        });
    };
};
ClickResumeService.prototype = ReadyService.prototype;

const ClickExperienceService = function () {
    this.runner = function () {
        return new Promise((resolve, reject) => {
            $().click();
            resolve();
        });
    };
}
ClickExperienceService.prototype = ReadyService.prototype;

const clickBasicService = new ClickBasicService();
const clickExperienceService = new ClickExperienceService();


const adapter = {
    tel: new AdapterField(valueCtrlFunc = () => {
        return $('.fz-resume .fz-tel');
    }),
    name: new AdapterField(runner = clickBasicService, valueCtrlFunc = () => {
        return $('input[name="name"]');
    }),
    gender: new AdapterField(runner = clickBasicService, textCtrlFunc = () => {
        return $('.radio-list .radio-checked');
    }, valueCtrlFunc = () => {
        return $('.radio-list input[type="hidden" name="gender"]');
    }, transferValueFunc = (val) => {
        switch (val) {
            case '男':
                return 1;
            case '女':
                return 0;
            default:
                return null;
        }
    }),
    mail: new AdapterField(runner = clickBasicService, runner = clickBasicService, textCtrlFunc = () => {
        return $('input[type="mail"]');
    }),
    birthday: new AdapterField(runner = clickBasicService, valueCtrlFunc = () => {
        return $('input[name="birthday"]');
    }),
    summary: new AdapterField(runner = clickBasicService, valueCtrlFunc = () => {
        return $('textarea[name="advantage"]');
    }),
    jobIntension: {
        items: {
            properties: {
                name: new AdapterField(runner = clickExperienceService,
                    valueCtrlFunc = () => {

                    },
                    textCtrlFunc = () => {  

                    })
            }
        },
        getItemsLength:()=>{
            
        },
        getNewItem: () => {
            return new Promise((resolve, reject) => {

            });
        },
        deleteItem: () => {

        }
    }
};




export default adapter;