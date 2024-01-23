<template>
  <login v-if="!store.isLogedIn"></login>
  <header v-if="store.isLogedIn" class="w-100 p-3 d-flex justify-content-between align-items-center shadow-sm">
    <section class="d-flex gap-3 align-items-center">
      <img src="https://femathletic-lb.com/logo.png" alt="logo" width="50" class="object-fit-cover rounded-circle border">
      <div class="d-flex flex-column">
        <h5 class="sand fw-bold">FFC Dashboard</h5>
        <span class="fs-x-small text-secondary slab">version {{ store.version }}</span>
      </div>
    </section>
    <nav class="d-none d-lg-flex gap-3 align-items-center pop">
      <router-link to="/">Admin</router-link>
      <router-link to="/users">Users</router-link>
      <router-link to="/website">Website</router-link>
      <router-link to="/support" class="text-secondary">Support</router-link>
    </nav>
    <i class="d-block d-lg-none bi bi-three-dots-vertical fs-4 text-danger" data-bs-toggle="dropdown"></i>
    <ul class="dropdown-menu">
      <li class="dropdown-item"><router-link to="/">Admin</router-link></li>
      <li class="dropdown-item"><router-link to="/users">Users</router-link></li>
      <li class="dropdown-item"><router-link to="/website">Website</router-link></li>
      <li class="dropdown-item"><router-link to="/support">Support</router-link></li>
    </ul>
  </header>
  <main v-if="store.isLogedIn"  class="py-5">
    <router-view></router-view>
  </main>
  <footer class="px-3 py-5">
    <h6 class="fs-x-small text-center text-secondary pop">Developed by <a href="http://wa.mashoun.com">Libancode</a> - version {{ store.version }}</h6>
  </footer>
</template>
<script>
import { useStore } from './stores/mainStore';
// import login from './components/login.vue';
import login from './components/login.vue'
export default {
  setup() {
    const store = useStore();
    return { store };
  },
  components: { login }
}
</script>
