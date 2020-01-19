import { initDictOptions } from '@comp/dict/JDictSelectUtil'

export default {
  data() {
    return {
      dictesCreateFields: [
        // Dictes generate rules, one elem for one dict name
      ],
      types: {
        // Dictes, hard-code types defined here.
      },
    }
  },
  methods: {
    async initDictConfig() {
      const fields = this.dictesCreateFields
      // Break on empty dictesCreateFields
      if (!fields.length) {
        return
      }
      const types = Object.assign({}, this.types)
      let promises = []
      fields.forEach(item => promises.push(initDictOptions(item)))
      try {
        for (const [index, promise] of promises.entries()) {
          const response = await promise
          const field = fields[index]
          if (!response.success) {
            throw new Error(`获取${field}字典时发生错误`)
          }
          types[field] = response.result
        }
        this.types = types
      } catch (e) {
        this.$message.error(e.message)
        throw e
      }
    },
  },
}