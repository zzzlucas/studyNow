import { orderTypesWithSpecialFields } from './types'

export default {
  data() {
    return {
      types: {
        orderTypesWithSpecialFields,
      },
    }
  },
  computed: {
    orderTypeProjectPeriod() {
      return this.types.orderTypesWithSpecialFields.projectPeriod.types
    },
    orderTypeProject() {
      return this.types.orderTypesWithSpecialFields.project.types
    },
  },
}