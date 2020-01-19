import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      keyword: '',
      pageNo: 1,
      pageSize: 10,
    }
  },
  computed: {
    ...mapGetters(['parkId']),
  },
  methods: {
    goRouter(route) {
      this.$router.push({ name: route })
    },
  }
}
