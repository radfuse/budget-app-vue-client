<template>
    <div class="collapse mb-3" :class="{ 'show': open }">
        <form @submit="filterSubmit">
            <div class="border p-3">
                <div class="form-group">
                    <label for="filterCategory">Category</label>
                    <select class="form-control" id="filterCategory" v-model="category_id">
                        <option value="" disabled selected>Select...</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="filterDate">Date</label>
                    <datepicker
                        id="filterDate"
                        :input-class="{ 'form-control': true }"
                        :format="'yyyy-MM-dd'"
                        v-model="transaction_date"
                    ></datepicker>
                </div>

                <button class="btn btn-sm btn-primary" type="submit">Filter</button>
                <button class="btn btn-sm btn-danger float-right" type="button" @click="clearFilter()">Clear filter</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";

export default {
    name: 'TransactionFilter',
    props: ['open', 'setFilter'],
	components: {
		Datepicker
	},
	data() {
		return {
			categories: {},
            category_id: null,
            transaction_date: null,
		}
	},
	methods: {
		filterSubmit(e) {
            e.preventDefault()
            let date = new Date(this.transaction_date)
            
            this.setFilter({
                category_id: this.category_id,
                transaction_date: date.toISOString().split('T')[0]
            });
        },
		clearFilter() {
            this.setFilter({});
        }
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
