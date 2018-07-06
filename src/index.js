import $ from 'jquery';
import JsonEditor from 'json-editor';
import './style/site.less';
import ContainerTemplate from './templates/container.html';
import form from './form.js';
import zhipin from './adapter/zhipin/zhipin';
import {
    AdapterCollection,
    AdapterField
} from './model/Adapter';
import adapter from './adapter/zhipin/zhipin';
import ReadyService from './model/ReadyService';


(function () {
    const getItemValue = async (fieldAdapter) => {
        try {
            if (fieldAdapter.service instanceof ReadyService) {
                await fieldAdapter.service.run();
            }

            let value = await fieldAdapter.getValue();

            if (fieldAdapter.transferValue instanceof Function) {
                return fieldAdapter.transferValue(value);
            } else {
                return value;
            }
        } catch (error) {
            return Promise.reject(error);
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

    $('#cvt_sync_right_btn').click(async () => {
        try {
            await zhipin.constructor();
            for (var key in form.properties) {
                let property = form.properties[key];
                let setter = null;
                let val = null;
                let fieldEditor = editor.getEditor('root.' + key);

                let adapterItem = zhipin[key];
                if (adapterItem) {
                    if (adapterItem instanceof AdapterField) {
                        val = await getItemValue(adapterItem);
                        console.log(`${key}:${val}`);
                    } else if (adapterItem instanceof AdapterCollection) {

                    } else {

                    }

                    fieldEditor.setValue(val);
                }
            }
        } catch (error) {
            alert(error);
        }
    });

})();