<template>
	<div style="margin-top: 20px;">
		<a-form  :form="form">
		<li>
			<span v-if="!editing" @dblclick="edit">{{form.questionTitle}}</span>
			<input type="text" ref="input" v-if="editing" v-model="form.questionTitle" @blur="save"></br>
			<a-checkbox-group  @change="onChange"> 
				<!--<a-checkbox>
					<span v-if="!editing1" @dblclick="edit1(i)">{{data[i]}}</span>
					<input type="text" ref="input" v-if="editing1 && i===editing1Index" v-model="data[i]" @blur="save1">
				</a-checkbox>-->


					<a-checkbox value="A">
						<span v-if="!editing1" @dblclick="edit1">{{form.questionOption[0]}}</span>
					    <input type="text" v-if="editing1" v-model="form.questionOption[0]" @blur="save1"></br>
					</a-checkbox>

					<a-checkbox value="B">
						<span v-if="!editing2" @dblclick="edit2">{{form.questionOption[1]}}</span>
					<input type="text" v-if="editing2" v-model="form.questionOption[1]" @blur="save2"></br>
					</a-checkbox>

					<a-checkbox value="C">
						<span v-if="!editing3" @dblclick="edit3">{{form.questionOption[2]}}</span>
					<input type="text" v-if="editing3" v-model="form.questionOption[2]" @blur="save3"></br>
					</a-checkbox>

					<a-checkbox value="D">
						<span v-if="!editing4" @dblclick="edit4">{{form.questionOption[3]}}</span>
					<input type="text" v-if="editing4" v-model="form.questionOption[3]" @blur="save4"></br>
					</a-checkbox>



			</a-checkbox-group>

		</li>
		</a-form >
		<!--<a-button type="primary" @click="addOneRadio">添加</a-button>
		<a-button type="primary" @click="delOneRadio">删除</a-button>-->

	</div>

</template>

<script>
	export default {
		name: 'Cb',

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
					questionType:1,
				},
				//				editing1Index: -1,
				
			}
		},
		methods: {
			edit() {
				this.editing = true

			},
			edit1(i) {
				this.editing1 = true

			},
			edit2() {
				this.editing2 = true

			},
			edit3(i) {
				this.editing3 = true

			},
			edit4() {
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
			onChange(){
				console.log(this.form)
			}

			//			addOneRadio() {
			//				console.log('qwe')
			//				this.list++;
			//			},
			//			delOneRadio() {
			//				console.log('wsx')
			//				this.list--;
			//			}
		}
	}
</script>

<style>

</style>