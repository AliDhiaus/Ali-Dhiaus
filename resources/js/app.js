import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

// Import components
import Barang from './components/Barang.vue';
import Keranjang from './components/Keranjang.vue';
import NotFound from './components/NotFound.vue';

// Create the Vue app
const app = createApp({});

// Register components globally
app.component('barang-component', Barang);
app.component('keranjang-component', Keranjang);
app.component('NotFound-component', NotFound);

// Define routes
const routes = [
    { path: '/home', name: 'home', component: Barang },
    { path: '/keranjang', name: 'keranjang', component: Keranjang },
    { path: '/', redirect: '/home' }, // Redirect to home by default
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound } // Handle 404
];

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes
});

// Use router and store
app.use(router);
app.use(store);

// Mount the app to the DOM
app.mount('#app');
