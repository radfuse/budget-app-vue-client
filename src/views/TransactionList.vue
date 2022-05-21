<template>
	<div>
        <p>
            <router-link class="btn btn-success" :to="{ name: 'TransactionIncoming' }">Add income</router-link>
            <router-link class="btn btn-success ml-1" :to="{ name: 'TransactionExpense' }">Add expense</router-link>
        </p>
		<div v-if="loaded">
            <div v-if="data && data.length">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
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
import axios from 'axios'

export default {
	name: 'TransactionList',
	data() {
		return {
			data: null,
			loaded: false,
		}
	},
	methods: {
		fetchData() {
			axios.get('/transaction')
				.then((res) => {
					this.data = res.data
                    this.loaded = true
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.error(error)
				})
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
