<template>
	<section class="h-screen">
		<div class="px-6 h-full text-gray-800">
			<div
				class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
			>
				<h1 class="text-6xl">Register</h1>
				<div class="w-full">
					<form @submit.prevent="signUp">
						<div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
							<div class="mb-6">
								<input
									type="name"
									class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="exampleFormControlInput2"
									placeholder="Full Name"
									v-model="name"
								/>
							</div>
							<div class="mb-6">
								<input
									type="text"
									class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="exampleFormControlInput2"
									placeholder="Username"
									v-model="username"
								/>
							</div>
							<div class="mb-6">
								<input
									type="email"
									class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="exampleFormControlInput2"
									placeholder="Email address"
									v-model="registerEmail"
								/>
							</div>
							<div class="mb-6">
								<input
									type="password"
									class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="exampleFormControlInput2"
									placeholder="Password"
									v-model="registerPassword"
								/>
							</div>

							<div class="text-center lg:text-left">
								<input
									type="submit"
									:value="loading ? 'Loading' : 'Register'"
									:disabled="loading"
									class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	// @ts-nocheck

	import { supabase } from '../supabase.js';

	export default {
		data() {
			return {
				loading: false,
				loginEmail: '',
				registerEmail: '',
				name: '',
				username: '',
				registerPassword: '',
				loginPassword: '',
				user: null,
			};
		},
		methods: {
			async handleLogin() {
				try {
					this.loading = true;
					let { data, error } = await supabase.auth.signInWithPassword({
						email: this.loginEmail,
						password: this.loginPassword,
					});
					this.$router.push('todos');
					if (error) throw error;
					console.log('You are logged in!');
				} catch (error) {
					if (error instanceof Error) {
						alert(error.message);
					}
				} finally {
					this.loading = false;
				}
			},
			async signUp() {
				try {
					this.loading = true;
					const { data, error } = await supabase.auth.signUp({
						name: this.name,
						username: this.username,
						email: this.registerEmail,
						password: this.registerPassword,
					});
					console.log('You have been registered');
					this.$router.push('todos');
				} catch (error) {
					console.log(error);
				} finally {
					this.loading = false;
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
