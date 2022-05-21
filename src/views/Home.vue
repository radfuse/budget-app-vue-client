<template>
	<div v-if="loaded">
		<div v-if="data && data.length">
			<div v-for="month in data" :key="month.month" class="mb-3">
				<h2>{{ month.month }}</h2>

				<div class="row">
					<StatisticCard v-for="category in month.categories" :key="category.name" :category="category" />
				</div>
			</div>
		</div>
		<div v-else class="alert alert-warning">
			No data to show
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import StatisticCard from '../components/StatisticCard'

export default {
	name: 'Home',
	components: {
		StatisticCard
	},
	data() {
		return {
			data: null,
			loaded: false,
		}
	},
	methods: {
		getMessage() {
			axios.get('/statistics')
				.then((response) => {
					this.data = response.data
					this.loaded = true
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.error(error)
				})
		},
	},
	created() {
		this.getMessage()
	},
}
</script>
