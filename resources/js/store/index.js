import { createStore } from 'vuex';

export default createStore({
    state: {
        keranjang: [],
        barang: [
            { no: 1, nama: 'Sepatu', description: 'Sepatu mahal', stock: 100, quantity: 0, price: 80000 },
            { no: 2, nama: 'Celana', description: 'Celana mahal', stock: 100, quantity: 0, price: 120000 },
            { no: 3, nama: 'Baju', description: 'Baju mahal', stock: 100, quantity: 0, price: 70000 },
            { no: 4, nama: 'Jaket', description: 'Jaket mahal', stock: 100, quantity: 0, price: 150000 }
        ]
    },
    getters: {
        getKeranjang(state) {
            return state.keranjang;
        },
        getBarang(state) {
            return state.barang;
        }
    },
    actions: {
        addCart(context, payload) {
            context.commit('add_cart', payload);
        }, 
        deleteFromCart(context, payload) {
            context.commit('delete_from', payload);
        },
        deleteAll(context, payload) {
            context.commit('delete_all', payload);
        }      
    },
    mutations: {
        add_cart(state, payload) {
            const { id, name, quantity, harga } = payload;
            if (quantity <= 0) {
                alert('Anda belum mengisi jumlah barang yang ingin dibeli.');
                return;
            }
            const product = state.barang.find(product => product.nama === name);
            if (!product) {
                alert('Barang tidak ditemukan dalam daftar.');
                return;
            }
            if (quantity > product.stock) {
                alert('Maaf, stok barang tidak mencukupi. Silakan beli dalam jumlah yang lebih kecil.');
                return;
            }
            const existingItem = state.keranjang.find(item => item.name === name);
            if (existingItem) {
                existingItem.stok += quantity;
            } else {
                state.keranjang.push({ ...payload, stok: quantity });
            }
            product.stock -= quantity;
        },
        delete_from(state, payload) {
            const { index, quantityToDelete } = payload;
            const item = state.keranjang[index];
            
            if (!quantityToDelete) {
                alert('Isi dulu bos jumlah yang mau dihapus!!');
                return;
            }
            if (quantityToDelete <= 0 || quantityToDelete > item.stok) {
                alert('Jumlah barang yang ingin dihapus tidak valid.');
                return;
            }
            if (item.stok == quantityToDelete) {
                state.keranjang.splice(item, 1);
            }
            const product = state.barang.find(prod => prod.nama === item.name);
            if (product) {
                product.stock += quantityToDelete;
                product.quantity = 0;
            }
            item.stok -= quantityToDelete;
        },
        delete_all(state, name) {
            const index = state.keranjang.findIndex(item => item.name === name);            
            const deletedItem = state.keranjang[index];
            const productIndex = state.barang.findIndex(product => product.nama === name);
            const konfirmasi = confirm('Apakah anda yakin ingin menghapus semua?');
            if (konfirmasi) {
                state.barang[productIndex].stock += deletedItem.stok;
                state.barang[productIndex].quantity -= deletedItem.quantity;
                state.keranjang.splice(index, 1);
            } else {
                alert('Pemesanan tidak dihapus.');
            }
        }        
    }
});
