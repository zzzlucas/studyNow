<template>
	<div style="margin-top: 20px;">
		<a-form   :form="form">
		<li >
			<span v-if="!editing" @dblclick="edit">{{form.questionTitle}}</span>
			<input type="text"  v-if="editing"  v-model="form.questionTitle" @blur="save"></br>
			<a-textarea placeholder="输入答案" :rows="4" v-model="form.data" @pressEnter="qwe"/>
		</li>
       </a-form >
	</div>
</template>

<script>
	export default {
		name: 'tA',
		
		data(){
			return{
				editing: false,
				form:{
					questionTitle: '请输入问题',
					questionType:2,
				},
				
			}
		},
		methods:{
			edit: function() {
				this.editing = true
				
			},
			save: function() {
				this.editing = false
			},
			qwe(){
				console.log(this,form)
			}
		}
	}
</script>

<style>

</style>