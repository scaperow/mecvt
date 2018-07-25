import $ from 'jquery';
import JsonEditor from 'json-editor';
import './style/site.less';
import ContainerTemplate from './templates/container.html';
import form from './form.js';
import zhipin from './adapter/zhipin/zhipin';


(async function () {


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

    const getArrayValue = (field) => {
        let array = [];
        let objects = null;
        let itemObject = null;

        for (var i = 0; i < field.$size(); i++) {
            itemObject = {};

            for (let key in field) {
                if (!key.startsWith('$')) {
                    
                    console.log(`${key}:${field[key]}`);
                    itemObject[key] = getValue(field[key], i);
                }
            }

            array.push(itemObject);
        }

        return array;
    };

    const getValue = (field, index) => {
        console.log(`${field}:${index}`);
        let control = field.$control(index);
        if (control) {
            if (index > -1) {
                return field.$get(index, control);
            } else {
                return field.$get(control);
            }

        }

        return null;
    };

    $('#cvt_sync_right_btn').click(async () => {
        try {
            await zhipin.constructor();
            for (var key in form.properties) {
                let value = null;

                let ctrl = editor.getEditor('root.' + key);
                let field = zhipin[key];
                if (field) {
                    if (field.$isArray) {
                        value = getArrayValue(field);
                    } else {
                        value = getValue(field);
                    }

                    console.log(value);
                    ctrl.setValue(value);
                }
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

})();