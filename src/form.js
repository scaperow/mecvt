
const form = {
    type: "object",
    title: "基本信息",
    input_height: '100px',
    options: {
        disable_collapse: true,
    },
    properties: {
        name: {
            title: "姓名",
            type: "string",
            setter: {
                //matcher: 'h2.name',
                //isNotTrim:false,
                matcher(tag) {
                    return $('h2.name').prop('firstChild').nodeValue;
                }
            },
            getter: {
                
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
            enum: ["在职", "离职"]
        },
        needNewJob: {
            title: "是否要换工作",
            type: "string",
            enum: ["是", "否"]
        },
        tel: {
            title: "电话",
            type: "string"
        },
        mail: {
            title: "邮箱",
            type: "string"
        },
        education: {
            title: "学历",
            type: "string"
        },
        introduction: {
            title: "自我介绍",
            type: "string",
            format: 'textarea',
            adapter: {
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
        jobIntension: {
            type: "object",
            title: "求职意向",
            properties: {
                position: {
                    title: "期望职位",
                    type: "string"
                },
                minSalary: {
                    type: "number",
                    title: "最低薪资要求"
                },
                maxSalary: {
                    type: "number",
                    title: "最高薪资要求"
                }
            }
        }

    }
};

export default form;