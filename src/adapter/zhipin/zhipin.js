import AdapterField from '../../model/Adapter';
import ReadyService from '../../model/ReadyService';
import AdapterCollection from '../../model/Adapter';

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
    this.runner = (context) => {
        return new Promise((resolve, reject) => {
            context.parentTag.find('.op .fz-resume.fz-edit').click();
        });
    }
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
    mail: new AdapterField(runner = clickBasicService, textCtrlFunc = () => {
        return $('input[type="mail"]');
    }),
    birthday: new AdapterField(runner = clickBasicService, valueCtrlFunc = () => {
        return $('input[name="birthday"]');
    }),
    summary: new AdapterField(runner = clickBasicService, valueCtrlFunc = () => {
        return $('textarea[name="advantage"]');
    }),
    intension: new AdapterCollection(() => {
        return $('#resume-project [id=^row-]')
    }, {
            name: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="project-name"]');
            }),
            role: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="project-role"]');
            }),
            url: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="project-url"]');
            }),
            startTime: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="project-start-date"]');
            }),
            finishTime: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="project-end-date"]');
            }),
            description: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="project-description"]');
            }),
            performance: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return ('[ka="project-performance"]');
            })
        }
    ),
    careers: new AdapterCollection(() => {
        return $('#resume-project [id=^row-]');
    }, {
            company: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="work-company"]');
            }),
            position: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {

                return $('[ka="work-position-name"]');
            }),
            department: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="work-position"]');
            }),
            industry: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="work-industry"]')
            }),
            works: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="work-responsibility"]');
            }),
            performance: new AdapterField(runner = clickExperienceService, valueCtrlFunc = () => {
                return $('[ka="work-performance"]');
            })
        }
    )
};




export default adapter;