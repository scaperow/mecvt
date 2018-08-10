import $ from 'jquery';
import JsonEditor from 'json-editor';
import './style/site.less';
import './style/bootstrap-editor.css';
import ContainerTemplate from './templates/container.html';
import form from './form.js';
import zhipin from './adapter/zhipin/zhipin';
import './layer/layer.js';
import './layer/theme/default/layer.css';
import adapter from './adapter/zhipin/zhipin';


(async function () {

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
            if (!field.hasOwnProperty('$get')) {
                return control.val();
            } else {
                if (index > -1) {
                    return field.$get(index, control);
                } else {
                    return field.$get(control);
                }
            }

        }

        return null;
    };

    const setValue = async (key, value, index) => {
        if (zhipin.hasOwnProperty(key)) {
            var adapterField = zhipin[key];

            if (adapterField.hasOwnProperty('$set')) {
                if (index > -1) {
                    adapterField.$set(index, adapterField.$control(), value);
                } else {
                    adapterField.$set(adapterField.$control(), value);
                }
            } else {
                adapterField.$control().val(value);
            }

            if (adapterField.hasOwnProperty('$submit')) {
                await adapterField.$submit();
            }
        }
    };

    const setArrayValue =  (key, array) => {
        var arrayItem, adapterField = null;
        var adapterItemField = null;

        if (zhipin.hasOwnProperty(key)) {
            adapterField = zhipin[key];
            adapterField.$clear();

            for (var i = 0; i < array.length; i++) {
                arrayItem = array[i];
                adapterField.$create(i, arrayItem);

                for (var arrayItemKey in arrayItem) {
                    adapterItemField = adapterField[arrayItemKey];

                    setValue(arrayItemKey, arrayItem[arrayItemKey], i);
                }
            }

            if (adapterField.hasOwnProperty('$submit')) {
                adapterField.$submit();
            }
        }
    };

    $('#cvt_sync_right_btn').click(async () => {
        var layerIndex = null;

        try {

            layerIndex = layer.msg('正在为导入简历做准备', {
                icon: 16,
                scrollbar: false,
                shade: [1, '#fff'],
                time: 0 //不自动关闭
            });

            await zhipin.constructor();

            layer.close(layerIndex);


            layerIndex = layer.msg('进行中...', {
                icon: 16,
                shade: [1, '#fff'],
                scrollbar: false,
                time: 0 //不自动关闭
            });

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

                    console.debug(value);
                    ctrl.setValue(value);
                }
            }

            layer.close(layerIndex);

            layer.msg('导入成功');
        } catch (error) {
            console.error(error);
            layer.closeAll();

            layer.msg(error);
        }
    });


    $('#cvt_sync_left_btn').click(async () => {
        var layerIndex = null;

        try {

            layerIndex = layer.msg('正在为导出简历做准备', {
                icon: 16,
                scrollbar: false,
                shade: [1, '#fff'],
                time: 0 //不自动关闭
            });

            await zhipin.constructor();

            layer.close(layerIndex);

            layerIndex = layer.msg('进行中...', {
                icon: 16,
                shade: [1, '#fff'],
                scrollbar: false,
                time: 0 //不自动关闭
            });


            // 编辑器的值
            let editorObject = editor.getValue();

            // 遍历编辑器的值
            for (var editorField in editorObject) {
                let editorFieldValue = editorObject[editorField];
                console.log(editorField + ":" + editorFieldValue);
                if (editorFieldValue instanceof Array) {
                    await setArrayValue(editorField, editorFieldValue);
                } else {
                    setValue(editorField, editorFieldValue);
                }
            }

            [[200,300],[210,310]]

            if (zhipin.hasOwnProperty('$submit')) {
                await zhipin.$submit();
            }

            layer.close(layerIndex);

            layer.msg('导出成功,如果有错误,请手工修改');
        } catch (error) {
            console.error(error);
            layer.msg(error);
            layer.close(layerIndex);
        }
    });

})();