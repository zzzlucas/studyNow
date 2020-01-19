import { phone } from '../../../../config/regex'

const validatePercentage = (rule, value, callback) => {
    const num = Number(value)
    if (num > 100) {
        return callback(new Error('请输入合理比例'))
    }
    callback()
}

export default{
	type:[{
		required: true,
		message:"请填写必填项",
		trigger: "blur"
	}],
	text:[{
		required: true,
		message:"请填写必填项",
		trigger: "blur"
	}],
	company:[{
		required: true,
		message:"请填写必填项",
		trigger: "blur"
	}],
	name:[{
		required: true,
		message:"请填写必填项",
		trigger: "blur"
	}],
	email:[{
		required: true,
		message:"请填写必填项",
		trigger: "blur"
	}],
	phone:[{
		required: true,
		message:"请填写必填项",
		trigger: "blur"
	}],
}
