<template>
  <div class="container">
      <h1>Keranjang Belanja</h1>
      <table class="table w-100">
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
              <tr v-for="(cekout, index) in checkout" :key="index">
                  <th scope="row">{{ cekout.id }}</th>
                  <td>{{ cekout.name }}</td>
                  <td>{{ cekout.stok }}</td>
                  <td>{{ cekout.harga }}</td>
                  <td class="d-flex gap-3"><input type="number" class="border border-1 rounded" style="width: 70%;" placeholder="Jumlah..." v-model="cekout.opsiDelete" min="1" :max="cekout.stok"> <button class="btn btn-primary" @click="deleteFromCart(index, cekout.opsiDelete)"><i class="bi bi-trash"></i></button> <button class="btn btn-primary w-100" @click="deleteAll(cekout.name)">Delete ALL</button></td>
              </tr>
              <tr>
                  <td colspan="3">Total Harga:</td>
                  <td>{{ totalHarga }}</td>
                  <td><button class="btn btn-primary w-100" @click="bayar(checkout)">Bayar</button></td>
              </tr>
          </tbody>
      </table>
      <router-link to="/home" class=""><i class="bi bi-arrow-left-circle-fill"></i> Home</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
        checkout: 'getKeranjang',
        products: 'getBarang'
    }),
    totalHarga() {
          return this.checkout.reduce((total, item) => total + (item.stok * item.harga), 0);
    }
  },
  methods: {
    deleteFromCart(index, quantityToDelete) {
        const payload = { index, quantityToDelete };
        this.$store.dispatch('deleteFromCart', payload);
    },
    deleteAll(name) {
        this.$store.dispatch('deleteAll', name);
    },
    bayar(checkout){
        if(checkout.length > 0){
            alert('Pesanan sedang di proses kami akan segera menganterkan paket pesananmu')
        } else {
            alert('Anda belum memasukan apa apa ke keranjang')
        }
    }
  }
};
</script>