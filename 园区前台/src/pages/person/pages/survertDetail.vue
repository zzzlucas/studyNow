<template>
	<div>
		<div class="data1">
			<ul>
			
			
			</ul>
		</div>
	</div>
</template>

<script>
	import { getAction } from '@/api/manage'
	export default {
		data() {
			return {
				id: '',
			}
		},
		created() {
			console.log(this.$route.query.paperId)
			this.id = this.$route.query.paperId
			this.getData()
		},
		methods: {
			getData() {
				let id = this.id
				console.log(id)
				getAction(`/questionnaire/mgrQuestionnaireInfo/queryPaper?paperId=${id}`).then(res => {
					if(res.success && res.code == 200) {
						let data = res.result
						console.log(data)
					}
				})
			}
		}
	}
</script>

<style>

</style>