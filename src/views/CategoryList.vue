<template>
	<div>
        <p>
            <router-link class="btn btn-success" :to="{ name: 'CategoryCreate' }">Create category</router-link>
        </p>
		<div v-if="loaded">
            <div v-if="data && data.length">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="category in data" :key="category.id">
                            <td>
                                {{ category.name }}
                            </td>
                            <td style="width: 1%; white-space: nowrap">
                                <router-link :to="{ name: 'CategoryUpdate', params: { id: category.id } }" class="btn btn-sm btn-primary">Edit</router-link>
                                <a href="#" @click.prevent="deleteCategory(category.id)" class="btn btn-sm btn-danger ml-1">Delete</a>
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
	name: 'CategoryList',
	data() {
		return {
			data: null,
			loaded: false,
		}
	},
	methods: {
		fetchData() {
			axios.get('/category')
				.then((res) => {
					this.data = res.data
                    this.loaded = true
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.error(error)
				})
		},
        deleteCategory(id) {
            if (confirm('Do you really want to delete this item?')) {
                axios.delete('/category/' + id)
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
