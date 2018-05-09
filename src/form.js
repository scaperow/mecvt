
const form = {
    type: "object",
    title: "基本信息",
    input_height: '100px',
    template: 'hogan',
    options: {
    },
    properties: {
        name: {
            title: "姓名",
            type: "string",

            setter: {
                matcher(tag) {
                    return $('h2.name').prop('firstChild').nodeValue;
                }
            },
            getter: {

            },
            getTextControl(){

            },
            getValueControl(){
                
            }
        },
        gender: {
            title: "性别",
            type: "string",
            enum: ["男", "女"]
        },
        jobState: {
            title: "工作状态",
            type: "string",
            enum: ["在职", "离职"],
            setter: {
                matcher() {
                    let statusText = $('.fz-resume.fz-status').parent().text();
                    let statusArray = statusText.split('-');
                    if (statusArray && statusArray.length > 0) {
                        return statusArray[0];
                    }

                    return null;
                }
            }
        },
        needNewJob: {
            title: "是否要换工作",
            type: "string",
            enum: ["是", "否"],
            setter: {
                matcher() {
                    let statusText = $('.fz-resume.fz-status').parent().text();
                    let statusArray = statusText.split('-');
                    if (statusArray && statusArray.length > 1) {
                        if (statusArray[1] === '暂不考虑') {
                            return '否';
                        } else {
                            return '是';
                        }
                    }

                    return null;
                }
            }
        },
        tel: {
            title: "电话",
            type: "string",
            setter: {
                matcher() {
                    return $('.fz-resume.fz-tel').parent().text();
                }
            }
        },
        mail: {
            title: "邮箱",
            type: "string",
            setter: {
                matcher: ".span-email"
            }
        },
        education: {
            title: "学历",
            type: "string",
            setter: {
                matcher() {
                    return $('.fz-degree').parent().text().trim().replace(/学历/g, "");
                }
            }
        },
        introduction: {
            title: "自我介绍",
            type: "string",
            format: 'textarea',
            setter: {
                matcher() {
                    var val = $('#resume-summary .text').html().trim().replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br>/g, '\r\n');
                    return val;
                },
            }

        },
        summary: {
            format: 'textarea',
            title: "自我简介",
            type: "string"
        },


        career: {
            type: "array",
            title: "工作经历",
            items: {
                type: "object",
                title: "经历",
                properties: {
                    type: "object",
                    title: "经历",
                    company: {
                        title: "公司名称",
                        type: "string"
                    },
                    position: {
                        title: "职位",
                        type: "string"
                    },
                    department: {
                        title: "部门",
                        type: "string"
                    },
                    works: {
                        title: "工作内容",
                        type: "string"
                    },
                    achievement: {
                        title: "业绩",
                        type: "string"
                    },
                    salary: {
                        title: "薪资",
                        type: "string"
                    }
                }
            },
            setter: {
                mather() {
                    let experiences = $('#resume-history').find('[id^=row-]');
                    let experienceDom = null;
                    let experienceItem = null;
                    let items = [];
                    for (var i = 0; i < experiences.length; i++) {
                        experienceDom = experiences[i];
                        experienceItem = {
                            company: $(experienceDom).find('h4.name').text().trim(),
                            position: '',
                            department: "",
                            works: "",
                            achievement: "",
                            salary: ""
                        };
                    }
                }
            }
        },
        jobIntension: {
            type: "array",
            title: "求职意向",
            items: {
                type: "object",

                title: "意向",
                properties: {
                    type: "object",
                    title: "意向",
                    position: {
                        title: "期望职位",
                        type: "string"
                    },
                    minSalary: {
                        type: "number",
                        title: "最低薪资要求(单位:千)"
                    },
                    maxSalary: {
                        type: "number",
                        title: "最高薪资要求(单位:千)"
                    },
                    location: {
                        type: "string",
                        title: "就职城市"
                    },
                    trade: {
                        type: "string",
                        title: "行业"
                    }
                },
            },
            setter: {
                matcher() {

                    let purposes = $('#resume-purpose').find('[id^=row-]');
                    let purposeDom = null;
                    let intentItem = null;
                    let intents = [];
                    for (var i = 0; i < purposes.length; i++) {
                        purposeDom = purposes[i];
                        intentItem = {
                            position: $(purposeDom).find('.fz-job').parent().text().trim(),
                            minSalary: null,
                            maxSalary: null,
                            location: $(purposeDom).find('.fz-place').parent().text().trim(),
                            trade: $(purposeDom).find('.fz-industry').parent().text().trim()
                        }

                        let salaries = $(purposeDom).find('.fz-salary').parent().text().trim().replace(/k/g, '').split('-');
                        if (salaries.length > 1) {
                            intentItem.minSalary = parseInt(salaries[0]);
                            intentItem.maxSalary = parseInt(salaries[1]);
                        }

                        intents.push(intentItem);
                    }

                    return intents;
                }
            }
        },
        experience: {
            type: "array",
            title: "项目经验",
            items: {
                type: "object",
                title: "经验",
                properties: {
                    type: "object",
                    title: "经验",
                    name: {
                        title: "项目名称",
                        type: "string"
                    },
                    role: {
                        title: "担任角色",
                        type: "string"
                    },
                    external: {
                        title: "附加内容",
                        type: "array",
                        items: {}
                    },
                    startTime: {
                        title: "开始时间",
                        type: "string"
                    },
                    finishTime: {
                        title: "结束时间",
                        type: "string"
                    },
                    description: {
                        title: "描述",
                        type: "string"
                    },
                    achievement: {
                        title: "业绩",
                        type: "string"
                    }
                }

            },
            setter: {
                matcher() {
                    let projects = $('#resume-project').find('[id^=row-]');
                    let projectDom = null;
                    let experienceItem = null;
                    let experiences = [];
                    for (var i = 0; i < projects.length; i++) {
                        projectDom = projects[i];
                        experienceItem = {
                            name: $(experienceDom).find('h4.name')[0].firstChild,
                            role: $(experienceDom).find('h4.name')[0].lastChild,
                        }

                        let timeRangeText = $(experienceDom).find('span.period').text();
                        let timeRanges = timeRangeText.split('-');
                        if (timeRanges.length > 1) {
                            experienceItem.startTime = timeRanges[0];
                            experienceItem.finishTime = timeRanges[1];
                        }

                        experienceItem.description = $(experienceDom).find('div.text')[0].find('p').html().trim().replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br>/g, '\r\n');
                        experienceItem.achievement = $(experienceDom).find('div.text')[1].find('p').html().trim().replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br>/g, '\r\n');

                        experiences.push(experienceItem);

                    }



                    return experiences;
                }
            }
        }

    }
};

export default form;