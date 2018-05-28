
import $ from 'jquery';
import JsonEditor from 'json-editor';
import './style/site.less';
import ContainerTemplate from './templates/container.html';
import form from './form.js';
import zhipin from './adapter/zhipin/zhipin';
import { AdapterCollection, AdapterField } from './model/Adapter';
import adapter from './adapter/zhipin/zhipin';


(function () {
    const getItemValue = (fieldAdapter) => {
        let runner = fieldAdapter.runner;
        if (runner !== undefined && runner !== null) {
            if (runner instanceof Function) {
                runner();
            }
        }

        if (fieldAdapter.getValue) {
            let promise = fieldAdapter.getValue();
            promise.
                then((value) => {
                    console.log(value);
                })

        }
    };


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

            let adapterItem = zhipin[key];
            if (adapterItem) {
                if (adapterItem instanceof AdapterField) {
                    getItemValue(adapterItem);

                } else if (adapterItem instanceof AdapterCollection) {

                } else {

                }

                fieldEditor.setValue(val);
            }



        }
    });
})();