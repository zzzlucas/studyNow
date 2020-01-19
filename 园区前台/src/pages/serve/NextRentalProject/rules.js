import { phone } from '../../../../config/regex'

const validatePercentage = (rule, value, callback) => {
    const num = Number(value)
    if (num > 100) {
        return callback(new Error('请输入合理比例'))
    }
    callback()
}


export default {
    setUpYear: [
        { pattern: /^\d{4}$/, message: "请填写四位数字格式的年份", trigger: "blur" }
    ],
    isSewerLine: [
        {
            required: true,
            message: "请选择必选项",
            trigger: "blur"
        }
    ],
    custName: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        }
    ],
    registerAssets: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        }
    ],
    legalPerson: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        }
    ],
    telephone: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        },
        {
            pattern: phone,
            message: "请填写正确手机号",
            trigger: "blur"
        }

    ],
    agentPerson: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        }
    ],
    agentTel: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        },
        {
            pattern: phone,
            message: "请填写正确手机号",
            trigger: "blur"
        }
    ],
    email: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        },
        { type: "email", message: "请填写正确邮箱格式", trigger: "blur" }
    ],
    projectName: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        }
    ],
    getLandBuildingAddress: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        }
    ],
    mainBuildingContent: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        },
    ],
    investAmount: [
        {
            required: true,
            message: "请填写必填项"
        }
    ],
    registerCapital: [
        {
            required: true,
            message: "请填写必填项"
        }
    ],
    isForeignCapital: [
        {
            required: true,
            message: "请填写必填项",
            // trigger: "blur"   
            //诡异的事情：当它 trigger: "blur" 时，直接获取是不可以通过验证的，但明明它与上面的input不存在其他变量，但它不行  12.06
        }
    ],
    fixedAssetInvest: [
        {
            required: true,
            message: "请填写必填项",
            // trigger: "blur"
        }
    ],
    //比例验证
    // buildingDensity: [
    //     {
    //         validator: (rule, value, callback) => {
    //             validatePercentage(rule, value, callback)
    //         }
    //     }
    // ]
}