<template>
	<div>
		<form @submit="save">
            <h1 class="h3 mb-3 font-weight-normal">{{ id ? 'Update category: ' + old_name : 'Create category' }}</h1>
			<p class="alert alert-danger" v-if="error">{{ error }}</p>

			<div class="form-group">
				<label for="inputName" class="sr-only">Name</label>
				<input type="text" id="inputName" class="form-control" placeholder="Name" required="" v-model="name">
			</div>

            <button class="btn btn btn-success" type="submit">Save</button>
        </form>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'CategoryForm',
	data() {
		return {
			id: null,
			name: '',
			old_name: '',
			error: '',
		}
	},
	methods: {
		save(e) {
			e.preventDefault()

			this.error = ''

			let request = {
				url: '/category',
				method: 'PUT',
				data: { name: this.name }
			}

			if (this.id) {
				request.url += '/' + this.id
				request.method = 'PUT'
			} else {
				request.method = 'POST'
			}

			axios(request).then(() => {
					this.$router.push({ name: 'Categories' })
				})
				.catch((error) => {
                    // eslint-disable-next-line
                    console.error(error)
				})
		},
	},
	mounted () {
		if (this.$route.params.id) {
			this.id = this.$route.params.id;

			axios.get('/category/' + this.id)
				.then((response) => {
					this.name = this.old_name = response.data.name
				})
				.catch((error) => {
                    // eslint-disable-next-line
                    console.error(error)
				})
		}
	}
}
</script>
