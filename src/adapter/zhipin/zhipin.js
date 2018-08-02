var basicEditView = null;
var experienceEditViews = null;
var careersEditViews = null;

const $dom = function (failCount, timeout, executor) {
    return new Promise((resolve, reject) => {

        const interval = window.setInterval(() => {
            let tag = executor();
            if (tag && tag.length > 0) {
                resolve(tag);
            } else {
                if (--failCount <= 0) {
                    window.clearInterval(interval);
                    reject('页面出现错误');

                }
            }

        }, timeout);
    });
};

let setBasicEditView = () => {
    return new Promise(async (resolve, reject) => {
        let basicEditView = null;
        $('[ka="user-resume-edit-userinfo"]').click();

        try {
            basicEditView = await $dom(3, 2000, () => {
                return $('form.form-resume');
            });

            if (basicEditView) {
                $('[ka="user-resume-user-info-cancel"]').click();
                resolve(basicEditView);
            } else {
                reject(error);
            }
        } catch (error) {
            console.debug('form.form-resume not found');
            reject(error);
        }
    })
};

let setExperienceEditView = () => {
    return new Promise(async (resolve, reject) => {
        const result = [];
        const selector = $('#resume-project .history-item');

        for (let i = 0; i < selector.length; i++) {
            const subDetailView = $(selector[i]);
            if (subDetailView && subDetailView.length > 0) {

                $(subDetailView).find('.fz-resume.fz-edit').click();

                try {
                    const view = await $dom(3, 2000, () => {
                        return $('#resume-project form.form-resume');
                    });

                    if (view) {
                        result.push($(view));
                    } else {
                        reject('视图出现了错误');
                    }
                } catch (error) {
                    console.debug('form.form-resume not found');
                    reject(error);
                }
            }
        }

        resolve(result);
    })
};


let setCareersEditView = () => {
    return new Promise(async (resolve, reject) => {
        const result = [];
        const selector = $('#resume-history .history-item');

        for (let i = 0; i < selector.length; i++) {
            const subDetailView = $(selector[i]);
            if (subDetailView && subDetailView.length > 0) {

                $(subDetailView).find('.fz-resume.fz-edit').click();

                try {
                    const view = await $dom(3, 2000, () => {
                        return $('#resume-history form.form-resume');
                    });

                    if (view) {
                        result.push($(view));
                    } else {
                        reject('视图出现了错误');
                    }
                } catch (error) {
                    console.debug('form.form-resume not found');
                    reject(error);
                }
            }
        }

        resolve(result);
    })
};

const sleep = async (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

const adapter = {
    constructor: () => {
        return new Promise((resolve, reject) => {
            basicEditView = '';
            experienceEditViews = '';

            Promise.all([setBasicEditView(), setExperienceEditView(), setCareersEditView()])
                .then((views) => {
                    basicEditView = views[0];
                    experienceEditViews = views[1];
                    careersEditViews = views[2];
                    console.log('adapter has inited');
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    $submit: () => {
        basicEditView.find('button[type="submit"]').click();
    },
    $name: 'BOSS直聘',
    $key: 'zhipin',
    tel: {
        $control: () => {
            return $(document).find('.fz-resume.fz-tel').parent();
        },
        $get: (control) => {
            return control.text();
        },
        $set: (control, value) => {
            control.text(value);
        }
    },
    name: {
        $control: () => {
            return basicEditView.find('input[name="name"]');
        },
        $set: (control, value) => {
            control.val(value);
        },
        $get: (control) => {
            return control.val();
        }
    },
    gender: {
        $control: () => {
            return basicEditView.find('.radio-list .radio-checked');
        },
        $get: (control) => {
            switch (parseInt(control.val())) {
                case 1:
                    return "男";

                case 0:
                    return "女";

                default:
                    return null;
            }
        },
        $set: (control, value) => {
            switch (value) {
                case "男":
                    control.val(1);
                    break;

                case "女":
                    control.val(0);

                default:
                    control.val(null);
            }
        }
    },
    mail: {
        $control: () => {
            return basicEditView.find('input[name="email"]');
        },
        $get: (control) => {
            return control.val();
        },
        $set: (control, value) => {
            return control.val(value);
        }
    },
    birthday: {
        $control: () => {
            return basicEditView.find('input[name="birthday"]');
        },
        $get: (control) => {
            return control.val();
        },
        $set: (control, value) => {
            return control.val(value);
        }
    },
    summary: {
        $control: () => {
            return $(document).find('#resume-summary p');
        },
        $get: (control) => {
            return control.html().replace(/<br>/g, '\n');
        },
        $set: (control, value) => {
            control.val(value);
        }
    },
    experience: {
        $isArray: true,
        $size: () => {
            return experienceEditViews.length;
        },
        $clear: async () => {
            for (item in experienceEditViews) {
                item.find('.fz-resume.fz-delete').click();
                await sleep(500);
            }
        },

        name: {
            $control: (index) => {
                return experienceEditViews[index].find('[ka="project-name"]');
            },
            $set: (index, control, value) => {
                control.val(value);
            },
            $get: (index, control) => {
                return control.val();
            }
        },
        role: {
            $control: (index) => {
                return experienceEditViews[index].find('[ka="project-role"]');
            },
            $set: (index, control, value) => {
                control.val(value);
            },
            $get: (index, control) => {
                return control.val();
            }
        },
        url: {
            $control: (index) => {
                return experienceEditViews[index].find('[ka="project-url"]');
            },
            $set: (index, control, value) => {
                control.val(value);
            },
            $get: (index, control) => {
                return control.val();
            }
        },
        startTime: {
            $control: (index) => {
                return experienceEditViews[index].find('[ka="project-start-date"]');
            },
            $set: (index, control, value) => {
                control.val(value);
            },
            $get: (index, control) => {
                return control.val();
            }
        },
        finishTime: {
            $control: (index) => {
                return experienceEditViews[index].find('[ka="project-end-date"]');
            },
            $set: (index, control, value) => {
                control.val(value);
            },
            $get: (index, control) => {
                return control.val();
            }
        },
        description: {
            $control: (index) => {
                return experienceEditViews[index].find('[ka="project-description"]');
            },
            $set: (index, control, value) => {
                control.val(value);
            },
            $get: (index, control) => {
                return control.val();
            }
        },
        performance: {
            $control: (index) => {
                return experienceEditViews[index].find('[ka="project-performance"]');
            },
            $set: (index, control, value) => {
                control.val(value);
            },
            $get: (index, control) => {
                return control.val();
            }
        }
    },
    careers: {
        $isArray: true,
        $clear: () => {
            return Promise.resolve();
        },
        $size: () => {
            return careersEditViews.length;
        },
        $create: async (index, form) => {
            return new Promise(async (resolve, reject) => {
                $('#resume-history .fz-resume.fz-add').click();

                try {
                    let form = await $dom(3, 1000, () => {
                        return $('#resume-history form.form-resume');
                    });

                    careersEditViews.push(form);

                } catch (error) {
                    reject(error);
                }
            });
        },
        $remove: (index) => {

        },
        $submit: () => {

        },
        company: {
            $control: (index) => {
                return careersEditViews[index].find('[ka="work-company"]');
            }
        },
        position: {
            $control: (index) => {
                return careersEditViews[index].find('[ka="work-position-name"]');
            }
        },
        department: {
            $control: (index) => {
                return careersEditViews[index].find('[ka="work-position"]');
            }
        },
        industry: {
            $control: (index) => {
                return careersEditViews[index].find('[ka="work-industry"]');
            }
        },
        works: {
            $control: (index) => {
                return careersEditViews[index].find('[ka="work-responsibility"]');
            }
        },
        performance: {
            $control: (index) => {
                return careersEditViews[index].find('[ka="work-performance"]');
            }
        }
    }

};

export default adapter;