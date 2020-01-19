<template>
	<div style="margin-top: 20px;">
		<a-form :form="form">
		<li>
			<span v-if="!editing" @dblclick="edit">{{form.questionTitle}}</span>
			<input type="text" v-if="editing" v-model="form.questionTitle" @blur="save"></br>
			
			<a-radio-group @change="onChange">
				<!--<a-radio v-for="(i,index1) in Tlist" :value="index1">
					<span>adsa</span>
				   <span v-if="!editing1" @dblclick="edit1(index1)">{{data[index1]}}</span>
			       <input type="text" ref="input" v-if="editing1 && index1 === editing1Index"  v-model="data[index1]" @blur="save1"></br>
				</a-radio>-->

				<a-radio :value="1">
					<span v-if="!editing1" @dblclick="edit1">{{form.questionOption[0]}}</span>
					<input type="text" v-if="editing1" v-model="form.questionOption[0]" @blur="save1"></br>
				</a-radio>
				<a-radio :value="2">
					<span v-if="!editing2" @dblclick="edit2">{{form.questionOption[1]}}</span>
					<input type="text" v-if="editing2" v-model="form.questionOption[1]" @blur="save2"></br>
				</a-radio>
				<a-radio :value="3">
					<span v-if="!editing3" @dblclick="edit3">{{form.questionOption[2]}}</span>
					<input type="text" v-if="editing3" v-model="form.questionOption[2]" @blur="save3"></br>
				</a-radio>
				<a-radio :value="4">
					<span v-if="!editing4" @dblclick="edit4">{{form.questionOption[3]}}</span>
					<input type="text" v-if="editing4" v-model="form.questionOption[3]" @blur="save4"></br>
				</a-radio>

				<!--<a-radio>
					
					<span v-if="!editing1" @dblclick="edit1">{{data[0]}}</span>
					<input type="text" ref="input" v-if="editing1" v-model="data[0]" @blur="save1"></br>
				</a-radio>

				<a-radio>
					
					<span v-if="!editing2" @dblclick="edit2">{{data[1]}}</span>
					<input type="text" ref="input" v-if="editing2" v-model="data[1]" @blur="save2"></br>
				</a-radio>

				<a-radio>
					
					<span v-if="!editing3" @dblclick="edit3">{{data[2]}}</span>
					<input type="text" ref="input" v-if="editing3" v-model="data[2]" @blur="save3"></br>
				</a-radio>

				<a-radio>
					<span v-if="!editing4" @dblclick="edit4">{{data[3]}}</span>
					<input type="text" ref="input" v-if="editing4" v-model="data[3]" @blur="save4"></br>
				</a-radio>-->
			</a-radio-group>
			<!--<a-button type="primary" @click="addOneRadio">添加</a-button>
			<a-button type="primary" @click="delOneRadio">删除</a-button>-->
		</li>
		</a-form>
	</div>
</template>

<script>
	export default {
		name: 'rdio',

		data() {
			return {
				editing: false,
				editing1: false,
				editing2: false,
				editing3: false,
				editing4: false,
				form:{
					questionTitle: '请输入问题',
					questionOption: ['请输入答案', '请输入答案', '请输入答案', '请输入答案'],
					questionType:0,
				},
				//				editing1Index: -1,
				list: 1,
				data: ['请输入答案', '请输入答案', '请输入答案', '请输入答案'],
			}
		},
		methods: {
			edit() {
				this.editing = true

			},
			edit1(index) {
				this.editing1 = true
			},
			edit2(index) {
				this.editing2 = true

			},
			edit3() {
				this.editing3 = true

			},
			edit4(index) {
				this.editing4 = true
			},
			save() {
				this.editing = false
			},
			save1() {
				this.editing1 = false
			},
			save2() {
				this.editing2 = false
			},
			save3() {
				this.editing3 = false
			},
			save4() {
				this.editing4 = false
			},
			addOneRadio() {
				this.list++;
				this.data.length++;
			},
			delOneRadio() {
				this.list--;
			},
			onChange() {
				console.log(this.form)
			}
		}
	}
</script>

<style>

</style>