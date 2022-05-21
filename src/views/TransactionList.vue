<template>
	<div>
        <div class="mb-3">
            <router-link class="btn btn-success" :to="{ name: 'TransactionIncoming' }">Add income</router-link>
            <router-link class="btn btn-success ml-1" :to="{ name: 'TransactionExpense' }">Add expense</router-link>

            <button type="button" class="btn btn-secondary float-right" @click="filterOpen = !filterOpen" :class="{ 'active': filterOpen }">Filter</button>
        </div>

        <TransactionFilter :open="filterOpen" :setFilter="setFilter" />

		<div v-if="loaded">
            <div v-if="data && data.length">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th><a href="#" @click.prevent="sort('description')">Description</a></th>
                            <th><a href="#" @click.prevent="sort('category_id')">Category</a></th>
                            <th><a href="#" @click.prevent="sort('amount')">Amount</a></th>
                            <th><a href="#" @click.prevent="sort('transaction_date')">Date</a></th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="transaction in data" :key="transaction.id">
                            <td>
                                {{ transaction.description }}
                            </td>
                            <td>
                                {{ transaction.category_id }}
                            </td>
                            <td>
                                <span
                                    class="badge"
                                    :class="{'badge-danger': transaction.amount < 0, 'badge-success': transaction.amount >= 0}"
                                >
                                    {{ transaction.amount }}
                                </span>
                            </td>
                            <td>
                                {{ transaction.transaction_date }}
                            </td>
                            <td style="width: 1%; white-space: nowrap">
                                <a href="#" @click.prevent="deleteTransaction(transaction.id)" class="btn btn-sm btn-danger">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="alert alert-warning">
                No data to show
            </div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import TransactionFilter from '../components/TransactionFilter'

export default {
	name: 'TransactionList',
	components: {
		TransactionFilter
	},
	data() {
		return {
			data: null,
			loaded: false,
            sortAttribute: false,
            filterOpen: false,
            filter: {
                category_id: null
            },
		}
	},
	methods: {
		fetchData() {
            let url = '/transaction'
            let params = {}

            if (Object.keys(this.filter).length > 0) {
                for (const [key, value] of Object.entries(this.filter)) {
                    if (value) {
                        params['filter[' + key + ']'] = value
                    }
                }
            }

            if (this.sortAttribute) {
                params['sort'] = this.sortAttribute
            }

            if (Object.keys(params).length > 0) {
                let query = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
                url += '?' + query
            }

			axios.get(url)
				.then((res) => {
					this.data = res.data
                    this.loaded = true
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.error(error)
				})
		},
        sort(attribute) {
            if (this.sortAttribute == attribute) {
                this.sortAttribute = '-' + attribute
            } else {
                this.sortAttribute = attribute
            }

            this.fetchData()
        },
        setFilter(filter) {
            Vue.set(this, 'filter', filter)
            this.filterOpen = false
            this.fetchData()
        },
        deleteTransaction(id) {
            if (confirm('Do you really want to delete this item?')) {
                axios.delete('/transaction/' + id)
                    .then(() => {
                        this.fetchData()
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error)
                    })
            }
        }
	},
	created() {
		this.fetchData()
	},
}
</script>
