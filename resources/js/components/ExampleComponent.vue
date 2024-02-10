<template>
    <div class="container">
        <h1>Barang Dagang</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col">Jumlah Barang</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in barang" :key="product.no">
                    <th scope="row">{{ product.no }}</th>
                    <td>{{ product.nama }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.stock }}</td>
                    <td>{{ product.price }}</td>
                    <td><input type="number" class="w-100"  v-model="product.quantity" min="1" :max="product.stock"></td>
                    <td><button class="btn btn-primary w-100" @click="addCart(product.no, product.nama, product.stock, product.quantity, product.price)">Add to Cart</button></td>
                </tr>
            </tbody>
        </table>
        <h1>Keranjang Belanja</h1>
        <table class="table w-50">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cekout, index) in keranjang" :key="index">
                    <th scope="row">{{ cekout.id }}</th>
                    <td>{{ cekout.name }}</td>
                    <td>{{ cekout.stok }}</td>
                    <td>{{ cekout.harga }}</td>
                    <td class="d-flex gap-3"><input type="number" class="border border-1 rounded" style="width: 70%;" placeholder="Jumlah..." v-model="cekout.opsiDelete" min="1" :max="cekout.stok"> <button class="btn btn-primary" @click="deleteFromCart(index, cekout.opsiDelete)"><i class="bi bi-trash"></i></button> <button class="btn btn-primary w-100" @click="deleteAll(cekout.name)">Delete ALL</button></td>
                </tr>
                <tr>
                    <td colspan="3">Total Harga:</td>
                    <td>{{ totalHarga }}</td>
                    <td><button class="btn btn-primary w-100" @click="bayar()">Bayar</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keranjang: [],
            barang: [
                {
                    no: 1,
                    nama: 'Sepatu',
                    description: 'Ini sepatu mahal guys',
                    stock: 100,
                    quantity: 0,
                    price: 80000
                },
                {
                    no: 2,
                    nama: 'Celana',
                    description: 'Ini sepatu mahal guys',
                    stock: 100,
                    quantity: 0,
                    price: 120000
                },
                {
                    no: 3,
                    nama: 'Baju',
                    description: 'Ini sepatu mahal guys',
                    stock: 100,
                    quantity: 0,
                    price: 70000
                },
                {
                    no: 4,
                    nama: 'Jaket',
                    description: 'Ini sepatu mahal guys',
                    stock: 100,
                    quantity: 0,
                    price: 150000
                }
            ]
        }
    },
    computed: {
        totalHarga() {
            return this.keranjang.reduce((total, item) => total + (item.stok * item.harga), 0);
        }
    },
    methods: {
        addCart(id, name, stok, quantity, harga) {
            const itemKeranjang = {
                id: this.keranjang.length +1,
                name,
                stok: quantity,
                harga
            }
            const existingItem = this.keranjang.find(item => item.name === name);
            if (stok === 0 || quantity  === 0) {
                alert('Stok barang sudah habis. atau anda belum mengisi jumlah barang yang ingin di beli');
                return;
            } else if (stok < quantity) {
                alert('Maaf stok barang tidak mencukupi. Silahkan beli lain waktu.');
                return;
            } else if (existingItem) {
                existingItem.stok += quantity;
            } else {
                this.keranjang.push(itemKeranjang);
            }
            const productIndex = this.barang.findIndex(product => product.nama === name);
            if (productIndex !== -1 ) {
                this.barang[productIndex].stock -= quantity;
            }
        },
        deleteFromCart(index, quantityToDelete) {
            const item = this.keranjang[index];
            if (!quantityToDelete) {
                alert('Isi dulu bos jumlah yang mau di apus!!');
                return;
            }
            if (quantityToDelete <= 0 || quantityToDelete > item.stok) {
                alert('Jumlah barang yang ingin dihapus tidak valid.');
                return;
            }
            item.stok -= quantityToDelete;
            if (item.stok <= 0) {
                this.keranjang.splice(index, 1);
            }
            const product = this.barang.find(prod => prod.nama === item.name);
            if (product) {
                product.stock += quantityToDelete;
            }
        },
        deleteAll(name) {
            const index = this.keranjang.findIndex(cekout => cekout.name === name);
            if (index !== -1) {
                const deletedItem = this.keranjang[index];
                const productIndex = this.barang.findIndex(product => product.nama === name);
                if (productIndex !== -1) {
                    this.barang[productIndex].stock += deletedItem.stok;
                    this.barang[productIndex].quantity -= deletedItem.stok;
                }
                confirm('Apakah anda yakin ingin menghapus semua?')
                this.keranjang.splice(index, 1);
            }
        },
        bayar() {
            alert("Pembayaran berhasil!");
        }
    }
}
</script>
