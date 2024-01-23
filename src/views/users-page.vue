<template>
    <section class="container">
        <div class="row g-4">
            <div class="col-12">
                <aside class="d-flex gap-3 flex-column  p-3 bg-beige rounded">
                    <i class="bi bi-people-fill fs-1 text-danger"></i>
                    <h4 class="pop fw-bold">
                        <span data-bs-toggle="dropdown">User Server</span>                        
                    </h4>
                    <ul class="nav nav-underline slab">
                        <li class="nav-item pointer" v-for="tab in tabs" :key="tab" @click="currentTab = tab">
                            <span class="nav-item"><span class="nav-link" :class="{ active: currentTab === tab }">{{tab}}</span></span>
                        </li>
                    </ul>
                    
                    
                </aside>
            </div>
            
            <div class="col-12" style="min-height:200px;">
                <aside class="p-3 border shadow-sm rounded"><component :is="currentTab"></component></aside>
            </div>
            
        </div>
    </section>
 </template>
 
 <script>
 import { useStore } from '../stores/mainStore'
 import members from '../components/user/members.vue'
 import guests from '../components/user/guests.vue'
 
 export default {
    setup() {
        const store = useStore();
        return { store };
    },
    components:{members,guests},
    data() {
        return {
            currentTab: 'guests',
            tabs: ['guests']
        }
    }
 }
 </script>