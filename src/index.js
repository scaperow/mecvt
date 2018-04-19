
import $ from 'jquery';
import JsonEditor from 'json-editor';
import './style/site.less';
import ContainerTemplate from './templates/container.html';
import form from './form.js';


(function () {
    $("head").append("<link>");
    const css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"
    });

    let isToggled = false;

    const $container = $(ContainerTemplate);
    $(document.body).append($container);

    const editor = new JSONEditor($("#cvt_fields")[0], {
        schema: form,
        disable_edit_json: true,
        disable_properties: true,
        disable_collapse: true,
        disable_array_add: true,
        disable_array_delete: true,
        disable_array_reorder: true,
        form_name_root: '',
        show_errors: '',
        input_width: '180px',
        theme: 'html'
    });

    $('#cvt_toggle_btn').click(() => {
        if (isToggled) {
            $('#cvt_app').css("transform", "translateX(0%)");
            $('#cvt_toggle_btn .fa').attr("class", "fa fa-caret-right");
        } else {
            $('#cvt_app').css("transform", "translateX(350px)");
            $('#cvt_toggle_btn .fa').attr("class", "fa fa-caret-left");

        }

        isToggled = !isToggled;
    });

    $('#cvt_sync_right_btn').click(() => {
        for (var key in form.properties) {
            let property = form.properties[key];
            let setter = null;
            let val = null;
            let fieldEditor = editor.getEditor('root.' + key);

            if (property.hasOwnProperty('setter')) {
                setter = property['setter'];
                val = '';

                try {
                    switch (typeof setter.matcher) {
                        case 'string':
                            val = $(setter.matcher).text();
                            if (!setter.notTrim) {
                                val = val.trim();
                            }
                            break;

                        case 'function':
                            val = setter.matcher();
                            break;
                    }
                } catch (e) {
                    console.error(e);
                }

                console.log(val);

                fieldEditor.setValue(val);
            }
        }
    });
})();
    /*

    var $summary = null;
    var editor = null;
    var form = {
        type: "object",
        title:"基本信息",
        options:{
            disable_collapse :true,
        },
        properties: {
            name: {
                title: "姓名",
                type:"string",
                adapter:{
                    mathcer:'h2.name'
                }
            },
            gender:{
                title:"性别",
                type: "string",
                enum: ["男","女"]
            },
            jobState:{
                title:"工作状态",
                type:"string",
                enum:["在职","离职"]
            },
            needNewJob:{
                title:"是否要换工作",
                type:"string",
                enum:["是","否"]
            },
            tel:{
                title:"电话",
                type:"string"
            },
            mail:{
                title:"邮箱",
                type:"string"
            },
            education:{
                title:"学历",
                type:"string"
            },
            introduction:{
                title:"自我介绍" ,
                type:"string"
            },
            summary:{
                title:"自我简介" ,
                type:"string"
            },
            jobIntension:{
                type:"object",
                title:"求职意向",
                properties:{
                    position:{
                        title:"期望职位"   ,
                        type:"string"
                    },
                    minSalary:{
                        type:"number",
                        title:"最低薪资要求"
                    } ,
                    maxSalary:{
                        type:"number",
                        title:"最高薪资要求"
                    }
                }
            }

        }
    };
    var loadScript = function(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if(typeof(callback) != "undefined"){
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                script.onload = function () {
                    callback();
                };
            }
        }
        script.src = url;
        document.body.appendChild(script);
    };

    var loadStyle = function(url, callback) {
        var script = document.createElement("link");
        script.rel = "stylesheet";
        if(typeof(callback) != "undefined"){
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                script.onload = function () {
                    callback();
                };
            }
        }
        script.href = url;
        document.body.appendChild(script);
    };


    var writeScript = function(){
        var scripts = ['https://cdn.bootcss.com/dragula/3.7.2/dragula.js','https://cdn.bootcss.com/json-editor/0.7.28/jsoneditor.js','https://cdn.bootcss.com/jspanel3/3.11.1/jquery.jspanel.js'];
        var styles = ['https://cdn.bootcss.com/dragula/3.7.2/dragula.css','https://cdn.bootcss.com/bootswatch/4.0.0/litera/bootstrap.min.css','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css','https://cdn.bootcss.com/jspanel3/3.11.1/jquery.jspanel.css'];

        if(!jQuery){
            scripts.slice(0,0,'https://cdn.bootcss.com/jquery/3.3.1/jquery.js');
        }

        scripts.forEach(function(script){
            loadScript(script);
        });

        styles.forEach(function(style){
            console.log(style);
            loadStyle(style);
        });
    };

    var writeControl = function(){
        setTimeout(function(){
            $.jsPanel({
                theme:       'primary',
                headerTitle: '我的简历',
                position:    'right-top',
                contentSize: {width: 450, height: 600},
                content:     '<div  style="padding:20px"><div id="editor"></div></div>',
                contentOverflow: 'scroll',
                headerToolbar: [
                    {
                        item:     "<button class='btn'><span class='fa fa-arrow-circle-left'> 向左同步</span></button>",
                        event:    "click",
                        callback: function (event) {event.data.content.append("<p>You clicked on the menu ...</p>"); }
                    },
                    {
                        item:     "<button class='btn' ><span class='fa fa-arrow-circle-right'>向右同步</span></button>",
                        event:    "click",
                        callback: function (event) {event.data.content.append("<p>You clicked on the menu ...</p>"); }
                    },
                    {
                        item:     "<button class='btn'><span  class='fa fa-circle-o'>自动同步</span></button>",
                        event:    "click",
                        callback: function (event) {event.data.content.append("<p>You clicked on the menu ...</p>"); }
                    }
                ],
                callback: function () {
                    // this.content.style.padding = '20px';

                    editor =  $("#editor")
                        .jsoneditor({
                        schema: form,
                        disable_edit_json :true,
                        disable_properties:true,
                        disable_collapse:true,
                        input_width :'180px',
                        theme: 'bootstrap3'
                    })
                        .on('ready', function() {
                        dragula([document.getElementsByClassName("resume-box")[0],document.getElementById("editor")]);
                        Object.keys(form.properties).forEach(function(key){
                            var property = form.properties[key];
                            if(property.adapter){
                                if(property.adapter.mathcer){

                                }
                            }

                        });
                    });
                },
                onbeforeclose: function () {
                    return confirm('Do you really want to close the panel?');
                }
            });

        },500);
    };

    writeScript();
    writeControl();
    */