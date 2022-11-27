import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/store';
import { supabase } from '../supabase.js';
// @ts-ignore
import Home from '../views/Home.vue';
// @ts-ignore
import Login from '../views/Login.vue';
// @ts-ignore
import SignUp from '../views/SignUp.vue';
// @ts-ignore
import Todos from '../views/TodoPage.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				title: 'Home',
				auth: false,
			},
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				title: 'Login',
				auth: false,
			},
		},
		{
			path: '/signup',
			name: 'singup',
			component: SignUp,
			meta: {
				title: 'Sign Up',
				auth: false,
			},
		},
		{
			path: '/todos',
			name: 'todos',
			component: Todos,
			meta: {
				title: 'Todos',
				auth: true,
			},
		},
	],
});
// change document titles
router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | Todo App`;
	next();
});

router.beforeEach((to, from, next) => {
	console.log(store.state.user);
	if (to.meta.auth) {
		if (store.state.user) {
			next();
		} else {
			next('login');
		}
	} else {
		next();
	}
});

export default router;
