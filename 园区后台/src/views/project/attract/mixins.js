export default {
  data() {
    return {
      config: null,
      cust: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    openConfig() {
      this.$refs.config.open(this.config)
    },
    openEnterpriseModal() {
      this.$refs.ent.showModal()
    },
    getCust(name, id) {
      this.form.setFieldsValue({ 'custId': name })
      this.cust = { id, name }
    }
  }
}
