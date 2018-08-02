const form = {
    type: "object",
    title: "基本信息",
    input_height: '100px',
    template: 'hogan',
    options: {},
    properties: {
        name: {
            title: "姓名",
            type: "string",
        },
        education: {
            title: "学历",
            type: "string"
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
            type: "string",
            setter: {
                matcher: ".span-email"
            }
        },
        introduction: {
            title: "自我介绍",
            type: "string",
            format: 'textarea'

        },
        summary: {
            format: 'textarea',
            title: "自我简介",
            type: "string"
        },


        careers: {
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
                    performance: {
                        title: "业绩",
                        type: "string",
                        format: "textarea"
                    },
                    department: {
                        title: "部门",
                        type: "string"
                    },
                    industry: {
                        title: "行业",
                        type: "string"
                    },
                    works: {
                        title: "工作内容",
                        type: "string",

                        format: 'textarea'
                    },

                    salary: {
                        title: "薪资",
                        type: "string"
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
                        type: "string",
                        format: 'textarea'
                    },
                    url: {
                        title: "链接",
                        type: "string"
                    },
                    performance: {
                        title: "业绩",
                        type: "string",
                        format: 'textarea'
                    },
                }

            }
        }

    }
};

export default form;