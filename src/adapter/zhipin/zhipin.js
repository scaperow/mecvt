import {
    AdapterCollection,
    AdapterField
} from '../../model/Adapter';
import View from '../../model/View';
import CollectionView from '../../model/CollectionView';

basicEditView = '';
experienceEditView = '';

const loopGetDocument = function (failCount, timeout, executor) {
    let failCount = failCount;
    return new Promise((resolve, reject) => {
        window.setInterval(() => {
            let tag = executor();
            if (tag && tag.length > 0) {
                resolve(tag);
            } else {
                if (--failCount <= 0) {
                    reject('页面出现错误');
                }
            }

        }, timeout);
    });
};

let setBasicEditView = new Promise((resolve, reject) => {
    let basicEditView = null;
    $('[ka="user-resume-edit-userinfo"]').click();

    try {
        basicEditView = await loopGetDocument(3, 2000, () => {
            return $('from.form-resume');
        });

        if (basicEditView) {
            resolve(new View(basicEditView));
            $('[ka="user-resume-edit-userinfo"]').click();
        } else {
            reject(error);
        }
    } catch (error) {
        reject(error);
    }
});

let setExperienceEditView = new Promise((resolve, reject) => {
    const selector = $('#resume-project .history-item');
    let size = selector.length;
    let experienceEditView = new CollectionView(size, (index) => {
        return new Promise((subResolve, subReject) => {
            const subDetailView = selector[index];
            if (subDetailView && subDetailView.length > 0) {
                $(subDetailView).find('.fz-resume .fz-edit').click();

                try {
                    const subEditView = await loopGetDocument(3, 2000, () => {
                        return $('form.form-resume');
                    });

                    if (subEditView) {
                        subResolve(new View(subEditView));
                    } else {
                        return subReject('页面出现错误');
                    }
                } catch (error) {
                    subReject(error);
                }
            }
        });

    });

    resolve(experienceEditView);
});



const adapter = {
    constructor: () => {
        basicEditView = '';
        experienceEditView = '';

        return new Promise((resolve, reject) => {
            Promise.all([setBasicEditView, setExperienceEditView])
                .then((views) => {
                    basicEditView = views[0];
                    experienceEditView = views[1];

                    resolve();
                })
                .catch((error) => {
                    reject(error);
                })
        });

    },
    tel: new AdapterField({
        getValueCtrl: (view) => {
            return view.find('.fz-resume .fz-tel');
        }
    }),
    name: new AdapterField({
        service: clickBasicService,
        getValueCtrl: (view) => {
            return view.find('input[name="name"]');
        }
    }),
    gender: new AdapterField({
        service: clickBasicService,
        getTextCtrl: (view) => {
            return view.find('.radio-list .radio-checked');
        },
        getValueCtrl: (view) => {
            return view.find('.radio-list input[type="hidden"][name="gender"]');
        },
        transferValue: (val) => {
            switch (parseInt(val)) {
                case 1:
                    return "男";

                case 0:
                    return "女";

                default:
                    return null;
            }
        }
    }),
    mail: new AdapterField({
        view: basicEditView,
        getValueCtrl: (view) => {
            return view.find('input[type="mail"]');
        }
    }),
    birthday: new AdapterField({
        view: basicEditView,
        getValueCtrl: (view) => {
            return view.find('input[name="birthday"]');
        }
    }),
    summary: new AdapterField({
        view: basicEditView,
        getValueCtrl: (view) => {
            return view.find('textarea[name="advantage"]');
        }
    }),
    experience: new AdapterCollection(3, {
        name: new AdapterField({
            view: experienceEditView,
            getValueCtrl: (view) => {
                return view.find('[ka="project-name"]');
            }
        }),
        role: new AdapterField({
            view: experienceEditView,
            getValueCtrl: (view) => {
                return view.find('[ka="project-role"]');
            }
        }),
        url: new AdapterField({
            view: experienceEditView,
            getValueCtrl: (view) => {
                return view.find('[ka="project-url"]');
            }
        }),
        startTime: new AdapterField({
            view: experienceEditView,
            getValueCtrl: (view) => {
                return view.find('[ka="project-start-date"]');
            }
        }),
        finishTime: new AdapterField({
            view: experienceEditView,
            getValueCtrl: (view) => {
                return view.find('[ka="project-end-date"]');
            }
        }),
        description: new AdapterField({
            view: experienceEditView,
            getValueCtrl: (view) => {
                return view.find('[ka="project-description"]');
            }
        }),
        performance: new AdapterField({
            view: experienceEditView,
            getValueCtrl: (view) => {
                return view.find('[ka="project-performance"]');
            }
        })
    }),
    careers: new AdapterCollection(3, {
        company: new AdapterField({
            getValueCtrl: (view) => {
                return view.find('[ka="work-company"]');
            }
        }),
        position: new AdapterField({
            getValueCtrl: (view) => {

                return view.find('[ka="work-position-name"]');
            }
        }),
        department: new AdapterField({
            getValueCtrl: (view) => {
                return view.find('[ka="work-position"]');
            }
        }),
        industry: new AdapterField({
            getValueCtrl: (view) => {
                return view.find('[ka="work-industry"]')
            }
        }),
        works: new AdapterField({
            getValueCtrl: (view) => {
                return view.find('[ka="work-responsibility"]');
            }
        }),
        performance: new AdapterField({
            getValueCtrl: (view) => {
                return view.find('[ka="work-performance"]');
            }
        })
    })
};

export default adapter;