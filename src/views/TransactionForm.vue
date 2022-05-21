<template>
	<div>
		<form @submit="save">
            <h1 class="h3 mb-3 font-weight-normal">Add {{ type == 0 ? 'income' : 'expense' }}</h1>
			<p class="alert alert-danger" v-if="error">{{ error }}</p>

			<div class="form-group">
				<label for="inputAmount">Amount</label>
				<input
					type="number"
					id="inputAmount"
					class="form-control"
					:class="{ 'is-invalid': fieldErrors.amount }"
					min="0" step=".01" required=""
					v-model="amount"
				/>
			
				<div v-if="fieldErrors.amount" class="invalid-feedback">
					{{ fieldErrors.amount }}
				</div>
			</div>

			<div class="form-group">
				<label for="inputCategory">Category</label>
				<select
					class="form-control"
					id="inputCategory"
					:class="{ 'is-invalid': fieldErrors.category_id }"
					v-model="category_id"
				>
					<option value="" selected>Uncategorized</option>
					<option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
				</select>

				<div v-if="fieldErrors.category_id" class="invalid-feedback">
					{{ fieldErrors.category_id }}
				</div>
			</div>

			<div class="form-group">
				<label for="inputDescription">Description</label>
				<input
					type="text"
					id="inputDescription"
					class="form-control"
					:class="{ 'is-invalid': fieldErrors.description }"
					v-model="description"
				/>

				<div v-if="fieldErrors.description" class="invalid-feedback">
					{{ fieldErrors.description }}
				</div>
			</div>

			<div class="form-group">
				<label for="inputDate">Date</label>
				<datepicker
					id="inputDate"
					:input-class="{ 'is-invalid': fieldErrors.transaction_date, 'form-control': true }"
					:format="'yyyy-MM-dd'"
					required=""
					v-model="transaction_date"
				></datepicker>

				<div v-if="fieldErrors.transaction_date" class="invalid-feedback d-block">
					{{ fieldErrors.transaction_date }}
				</div>
			</div>

            <button class="btn btn btn-success" type="submit">Save</button>
        </form>
	</div>
</template>

<script>
import Vue from 'vue'
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import axios from 'axios'

export default {
	name: 'TransactionForm',
	props: ['type'],
	components: {
		Datepicker
	},
	data() {
		return {
			id: null,
			description: '',
			amount: '',
			transaction_date: '',
			category_id: '',
			error: '',
			fieldErrors: {},
			categories: {},
		}
	},
	methods: {
		save(e) {
			e.preventDefault()

			this.error = ''

			let data = {
				type: this.type,
				description: this.description,
				amount: this.amount,
				category_id: this.category_id,
				transaction_date: this.transaction_date
			}

			axios.post('/transaction', data).then(() => {
					this.$router.push({ name: 'Transactions' })
				})
				.catch((error) => {
					let errorData = error?.response?.data;

					if (errorData) {
						if (errorData.message) {
							this.error = errorData.message
						} else if (errorData.length) {
							let fieldErrors = {}

							errorData.forEach(element => {
								fieldErrors[element.field] = element.message
							})

							Vue.set(this, 'fieldErrors', fieldErrors);
						}
					}
                    // eslint-disable-next-line
                    console.error(error)
				})
		},
	},
	mounted () {
		axios.get('/category')
			.then((response) => {
				this.categories = response.data
			})
			.catch((error) => {
				// eslint-disable-next-line
				console.error(error)
			})
	}
}
</script>

<style>
.vdp-datepicker .form-control[readonly] {
	background: #fff;
}
</style>
