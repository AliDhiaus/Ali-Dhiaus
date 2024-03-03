<template>
  <div class="container"> 
    <header class="d-flex justify-content-between align-items-center">
      <h1>Barang Dagang</h1>
      <div class="position-relative">
        <router-link to="/keranjang" class="fs-3"><i class="bi bi-cart4"></i></router-link>
        <span class="badge bg-danger position-fixed start">{{ notifikasi }}</span>
      </div>
    </header>
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
               <tr v-for="product in products" :key="product.no">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      checkout: 'getKeranjang',
      products: 'getBarang',
    })
  },
  methods: {
    addCart(id, name, stok, quantity, harga){
      const itemKeranjang = {
          id: this.checkout.length + 1,
          name,
          stok,
          quantity,
          harga
      };
      this.$store.dispatch('addCart', itemKeranjang) 
      this.notifikasi = this.checkout.reduce((total, item) => total + (item.stok), 0);
    },
  }
};
</script>
