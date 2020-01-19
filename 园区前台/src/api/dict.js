//获取数据字典的api
//在jeecg-boot上简化，只具备获取能力

import { getAction } from '@/api/manage'

const ajaxGetDictItems = (code, params) => getAction(`/sys/dict/getDictItems/${code}`, params);

export async function initDictOptions(dictCode) {
    if (!dictCode) {
        return '字典Code不能为空!';
    }
    //获取字典数组
    let res = await ajaxGetDictItems(dictCode);
    return res;
}

export function filterDictText(dictOptions, text) {
    let re = "";
    if (!dictOptions) {
        return re;
    }
    dictOptions.forEach(function (option) {
        if (text == option.value) {
            //此处===改为==
            re = option.text;
        }
    });
    return re;
}