<template>
	<nav class="flex flex-row items-center justify-between bg-blue-600 p-6">
		<div class="flex items-center flex-shrink-0 text-white mr-6">
			<router-link to="/">
				<span class="font-semibold text-xl tracking-tight">Super Todo</span>
			</router-link>
		</div>
		<div class="w-full flex justify-end">
			<div class="text-sm">
				<router-link
					to="/todos"
					class="mt-4 lg:mt-0 text-white hover:text-white mr-4"
				>
					Todos
				</router-link>
				<div class="mt-4 lg:mt-0 text-white hover:text-white mr-4">
					<router-link
						v-show="user"
						to="/login"
					>
						LogIn
					</router-link>
					<button
						v-show="!user"
						@click="logOut"
					>
						LogOut
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
	// @ts-nocheck

	import { supabase } from '../supabase.js';
	import { useRoute } from 'vue-router';
	import store from '../store/store.js';
	export default {
		data() {
			return {
				user: null,
			};
		},
		methods: {
			async logOut() {
				try {
					await supabase.auth.signOut();
					this.$router.push('/');
				} catch (error) {
					console.log(error);
				}
			},
		},
		computed: {
			getUser() {
				this.user = store.state.user;
			},
		},
	};
</script>

<style></style>
