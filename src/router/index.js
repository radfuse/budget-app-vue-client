import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CategoryList from '../views/CategoryList.vue'
import CategoryForm from '../views/CategoryForm.vue'
import TransactionList from '../views/TransactionList.vue'
import TransactionForm from '../views/TransactionForm.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { requiresAuth: true }
	},
	{
		path: '/categories',
		name: 'Categories',
		component: CategoryList,
		meta: { requiresAuth: true }
	},
	{
		path: '/category/create',
		name: 'CategoryCreate',
		component: CategoryForm,
		meta: { requiresAuth: true }
	},
	{
		path: '/category/:id',
		name: 'CategoryUpdate',
		component: CategoryForm,
		meta: { requiresAuth: true }
	},
	{
		path: '/transactions',
		name: 'Transactions',
		component: TransactionList,
		meta: { requiresAuth: true }
	},
	{
		path: '/transaction/incoming',
		name: 'TransactionIncoming',
		component: TransactionForm,
		meta: { requiresAuth: true },
		props: { type: 0 }
	},
	{
		path: '/transaction/expense',
		name: 'TransactionExpense',
		component: TransactionForm,
		meta: { requiresAuth: true },
		props: { type: 1 }
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: { requiresGuest: true }
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: { requiresGuest: true }
	},
	{
		path: '/logout',
		name: 'Logout',
		component: {
			beforeRouteEnter(to, from, next) {
				const destination = {
					path: "/login"
				}
				
				store.dispatch("logout")
				next(destination)
			}
		}
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach ((to, from, next) => {
	const isLoggedIn = store.getters.isAuthenticated
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
	const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)
  
	if (requiresAuth && !isLoggedIn) {
		next({ name: 'Login' })
	}
  
	if (requiresGuest && isLoggedIn) {
		next({ name: 'Home' })
	}
  
	next()
})

export default router
