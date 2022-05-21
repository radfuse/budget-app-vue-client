import Vue from 'vue'
import Vuex from 'vuex'
import { login, register, setApiHeader } from '@/api'
import { getAuthToken, setAuthToken, isValidJwt } from '@/jwt'
import { EventBus } from '@/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		jwt: getAuthToken(),
	},
	mutations: {
		setJwtToken (state, payload) {
			state.jwt = payload.jwt.token

            setAuthToken(payload.jwt.token)
            setApiHeader()
		}
	},
	actions: {
		login (context, userData) {
			return new Promise((resolve, reject) => {
				login(userData)
					.then(response => {
						context.commit('setJwtToken', { jwt: response.data })
						EventBus.$emit('loginStateChange', isValidJwt(response.data.token))
						resolve()
					})
					.catch(error => {
						console.log('Error Authenticating: ', error)
						EventBus.$emit('failedAuthentication', error?.response?.data)

						reject()
					})
			})
		},
		register (context, userData) {
			return new Promise((resolve, reject) => {
				register(userData)
					.then(() => {
						context.dispatch('login', userData)
							.then(() => resolve())
							.catch(() => reject())
					})
					.catch(error => {
						console.log('Error Registering: ', error)
						EventBus.$emit('failedRegistering', error?.response?.data)

						reject()
					})
			})
		},
		logout (context) {
			return new Promise((resolve) => {
				context.commit('setJwtToken', { jwt: '' })
				EventBus.$emit('loginStateChange', false)
				resolve()
			})
		}
	},
	modules: {
	},
	getters: {
		isAuthenticated (state) {
			return isValidJwt(state.jwt)
		},
		getTokenData (state) {
			const token = state.jwt
			const tokenParts = token.split('.')
			return JSON.parse(Buffer.from(tokenParts[1], 'base64'))
		}
	}
})

export default store