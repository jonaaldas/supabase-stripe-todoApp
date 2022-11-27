<template>
	<div>
		<h2 class="text-3xl text-black text-center">Your Todo List</h2>
		<div class="flex flex-col items-center">
			<input
				type="text"
				placeholder="Add todo"
				v-model="titleTodo"
				class="form-control px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
			/>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				@click="addTodo()"
			>
				Add todo
			</button>
			<div
				v-for="(todo, index) of todos"
				:key="index"
				class="flex items-center justify-center"
			>
				<div class="w-96">
					<h2>{{ todo.todo }}</h2>
					<small>{{ todo.created_at }}</small>
				</div>
				<button
					class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					@click="deleteTodo(index, todo.todo)"
				>
					Delete
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	// @ts-nocheck
	import { supabase } from '../supabase.js';
	import store from '../store/store';

	export default {
		data() {
			return {
				titleTodo: '',
				todos: [],
				user: '',
			};
		},
		methods: {
			async addTodo() {
				const { data, error } = await supabase
					.from('todos')
					.insert([{ todo: this.titleTodo, user_id: this.user.id }]);
				this.titleTodo = '';
			},
			async deleteTodo(todoIndex, title) {
				if (title) {
					const { data, error } = await supabase
						.from('todos')
						.delete()
						.eq('todo', title);
				}
				this.getAllTodos();
			},
			async getAllTodos() {
				let { data: todos, error } = await supabase.from('todos').select('*');
				console.log(this.user?.id);
				this.todos = todos.filter((todo) => todo.user_id === this.user?.id);
			},
		},
		created() {
			this.getAllTodos();
			this.user = store.state.user;
		},
		watch: {
			titleTodo: {
				handler() {
					this.getAllTodos();
				},
			},
		},
	};
</script>

<style></style>
