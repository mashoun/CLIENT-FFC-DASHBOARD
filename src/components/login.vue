<template>
    <section class="w-100 h-100 bg-beige d-flex justify-content-center align-items-center position-fixed z-3">
        <section class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-5">
                    <aside class="text-center p-3 shadow-sm bg-light rounded d-flex flex-column align-items-center gap-4">
                        <img src="https://femathletic-lb.com/logo.png" alt="logo" width="100"
                            class="object-fit-cover rounded-circle border">
                        <h3 class="sand fs-4">Femathletic Fitness Center</h3>
                        <p class="pop text-secondary">DASHBOARD</p>

                        <div class="d-flex flex-column gap-2 w-100">
                            <input class="form-control" v-model="store.admin.username" type="text" placeholder="Username">
                            <input class="form-control" v-model="store.admin.password" type="password"
                                placeholder="Password">
                            <button class="btn btn-outline-danger" @click="login">
                                <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                                <span v-else>Login</span>
                            </button>
                        </div>

                        <small class="fs-x-small text-secondary pop">
                            Developed by <a href="http://wa.mashoun.com">libancode - version {{ store.version }}</a>
                        </small>
                    </aside>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
import { useStore } from '../stores/mainStore';
export default {
    setup() {
        const store = useStore();
        return { store };
    },
    data() {
        return {
            spinner: false
        }
    },
    methods: {
        login() {
            this.spinner = true
            fetch(this.store.getApi() + '?login=1', {
                method: "POST",
                headers: {
                    "content-Type": "text/plain"
                },
                body: JSON.stringify({
                    admin:this.store.admin
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.store.db = res
                this.store.isLogedIn = true
                this.spinner = false
            })
            .catch(err => {
                alert("Error")
            })
        }
    }
}
</script>