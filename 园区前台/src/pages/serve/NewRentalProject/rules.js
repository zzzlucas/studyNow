import { phone } from '../../../../config/regex'

const validatePercentage = (rule, value, callback) => {
    const num = Number(value)
    if (num > 100) {
        return callback(new Error('请输入合理比例'))
    }
    callback()
}


export default {
    projectName: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        }
    ],
    mainProduct: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        },

    ],
    industrySectorValue: [
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
    belongSubject: [
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
    legalTel: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        },
        // first
        { pattern: phone, message: "请填写正确手机号码", trigger: "blur" }
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
        { pattern: phone, message: "请填写正确手机号码", trigger: "blur" }
    ],
    investAmount: [
        {
            required: true,
            message: "请填写必填项",
            // trigger: "blur"   
            //诡异的事情：当它 trigger: "blur" 时，直接获取是不可以通过验证的，但明明它与上面的input不存在其他变量，但它不行  12.06
        }
    ],
    registerCapital: [
        {
            required: true,
            message: "请填写必填项",
            // trigger: "blur"
        }
    ],
    isForeignCapital: [
        {
            required: true,
            message: "请填写必填项",
            trigger: "blur"
        }
    ],
    rentBuildArea: [
        {
            required: true,
            message: "请填写必填项",
            // trigger: "blur"
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
    //比例验证
    buildingDensity: [
        {
            validator: (rule, value, callback) => {
                validatePercentage(rule, value, callback)
            }
        }
    ],
    plotRatio: [
        {
            validator: (rule, value, callback) => {
                validatePercentage(rule, value, callback)
            }
        }
    ],
    //劳动生产率,允许超过100%
    productionRate: [
        // {
        //     validator: (rule, value, callback) => {
        //         validatePercentage(rule, value, callback)
        //     }
        // }
    ],
}