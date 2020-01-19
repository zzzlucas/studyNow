<template>
	<div>
		<a-radio>
			<span v-if="!editing1" @dblclick="edit1">{{item.anwers}}</span>
			<input type="text" ref="input" v-if="editing1" v-model="item.anwers" @blur="save1"></br>
		</a-radio>
	</div>
</template>

<script>
	export default{
		name:'oneRadio',
		
		data(){
			return{
				editing: false,
			}
		},
		methods:{
			edit: function() {
				this.editing = true
				this.$nextTick(function() {
					this.$els.input.focus()
				})
			},
			save: function() {
				this.editing = false
			},
		}
	}
</script>

<style>

</style>