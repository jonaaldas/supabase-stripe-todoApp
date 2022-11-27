<template>
	<div
		v-if="appReady"
		class="min-h-full box-border"
	>
		<NavBar />
		<router-view></router-view>
	</div>
</template>

<script>
	// @ts-nocheck

	import { supabase } from './supabase.js';
	import NavBar from './components/NavBar.vue';
	import store from './store/store.js';
	export default {
		data() {
			return {
				appReady: null,
			};
		},
		methods: {
			async checkIfUserIsReady() {
				const {
					data: { user },
				} = await supabase.auth.getUser();
				if (!user) {
					this.appReady = true;
				}
			},
		},
		components: { NavBar },
		created() {
			this.checkIfUserIsReady();
		},
		watch: {
			appReady: {
				handler() {
					supabase.auth.onAuthStateChange((_, session) => {
						console.log(session);
						store.methods.setUser(session);
						this.appReady = true;
					});
				},
				immediate: true,
			},
		},
	};
</script>

<style></style>
