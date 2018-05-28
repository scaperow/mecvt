
import { AdapterCollection, AdapterField } from '../../model/Adapter';

import ReadyService from '../../model/ReadyService';
const ClickBasicService = function () {

};
ClickBasicService.prototype = ReadyService.prototype;
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
    tel: new AdapterField({
        getValueCtrl: () => {
            return $('.fz-resume .fz-tel');
        }
    }),
    name: new AdapterField({
        runner: clickBasicService, getValueCtrl: () => {
            return $('input[name="name"]');
        }
    }),
    gender: new AdapterField(
        {
            runner: clickBasicService, getTextCtrl: () => {
                return $('.radio-list .radio-checked');
            }, getValueCtrl: () => {
                return $('.radio-list input[type="hidden" name="gender"]');
            }, transferValueFunc: (val) => {
                switch (val) {
                    case '男':
                        return 1;
                    case '女':
                        return 0;
                    default:
                        return null;
                }
            }
        }),
    mail: new AdapterField({
        runner: clickBasicService, getValueCtrl: () => {
            return $('input[type="mail"]');
        }
    }),
    birthday: new AdapterField({
        runner: clickBasicService, getValueCtrl: () => {
            return $('input[name="birthday"]');
        }
    }),
    summary: new AdapterField({
        runner: clickBasicService, getValueCtrl: () => {
            return $('textarea[name="advantage"]');
        }
    }),
    intension: new AdapterCollection(() => {
        return $('#resume-project [id=^row-]')
    }, {
            name: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="project-name"]');
                }
            }),
            role: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="project-role"]');
                }
            }),
            url: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="project-url"]');
                }
            }),
            startTime: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="project-start-date"]');
                }
            }),
            finishTime: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="project-end-date"]');
                }
            }),
            description: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="project-description"]');
                }
            }),
            performance: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return ('[ka="project-performance"]');
                }
            })
        }
    ),
    careers: new AdapterCollection(() => {
        return $('#resume-project [id=^row-]');
    }, {
            company: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="work-company"]');
                }
            }),
            position: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {

                    return $('[ka="work-position-name"]');
                }
            }),
            department: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="work-position"]');
                }
            }),
            industry: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="work-industry"]')
                }
            }),
            works: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="work-responsibility"]');
                }
            }),
            performance: new AdapterField({
                runner: clickExperienceService, getValueCtrl: () => {
                    return $('[ka="work-performance"]');
                }
            })
        }
    )
};




export default adapter;