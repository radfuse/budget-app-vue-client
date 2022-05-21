<template>
	<form class="form-signin" @submit="register">
		<h1 class="h3 mb-3 font-weight-normal text-center">Register</h1>
		<p class="alert alert-danger" v-if="error">{{ error }}</p>

		<div class="form-group">
			<label for="inputEmail" class="sr-only">Email address</label>
			<input
				type="email"
				id="inputEmail"
				class="form-control"
				:class="{ 'is-invalid': fieldErrors.email }"
				placeholder="Email address"
				required="" autofocus=""
				v-model="email"
			/>
		
			<div v-if="fieldErrors.email" class="invalid-feedback">
				{{ fieldErrors.email }}
			</div>
		</div>

		<div class="form-group">
			<label for="inputPassword" class="sr-only">Password</label>
			<input
				type="password"
				id="inputPassword"
				class="form-control"
				:class="{ 'is-invalid': fieldErrors.password }"
				placeholder="Password"
				required=""
				v-model="password"
			/>
		
			<div v-if="fieldErrors.password" class="invalid-feedback">
				{{ fieldErrors.password }}
			</div>
		</div>

		<div class="form-group">
			<label for="inputPasswordAgain" class="sr-only">Password</label>
			<input
				type="password"
				id="inputPasswordAgain"
				class="form-control"
				:class="{ 'is-invalid': fieldErrors.password_again }"
				placeholder="Password again"
				required=""
				v-model="password_again"
			/>
		
			<div v-if="fieldErrors.password_again" class="invalid-feedback">
				{{ fieldErrors.password_again }}
			</div>
		</div>

		<button class="btn btn-primary btn-block" type="submit">Register</button>
	</form>
</template>

<script>
import Vue from 'vue'
import { EventBus } from '@/utils'

export default {
	name: 'Register',
	data() {
		return {
			email: '',
			password: '',
			password_again: '',
			error: '',
			fieldErrors: {},
		}
	},
	methods: {
		register(e) {
			e.preventDefault()

			this.error = ''

			this.$store.dispatch('register', {email: this.email, password: this.password, password_again: this.password_again})
				.then(() => {
					this.$router.push('/')
				})
				.catch((error) => {
                    // eslint-disable-next-line
                    console.error(error)
				})
		},
	},
	mounted () {
		EventBus.$on('failedRegistering', (error) => {
			if (error.message) {
				this.error = error.message
			} else if (error.length) {
				let fieldErrors = {}

				error.forEach(element => {
					fieldErrors[element.field] = element.message
				})

				Vue.set(this, 'fieldErrors', fieldErrors);
			}
		})
	},
	beforeDestroy () {
		EventBus.$off('failedRegistering')
	}
}
</script>
