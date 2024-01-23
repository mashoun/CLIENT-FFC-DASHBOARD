<template>
    <section class="container">
        <div class="row g-4">
            <div class="col-12">
                <aside class="d-flex gap-3 flex-column p-3 bg-beige rounded">
                    <i class="bi bi-layout-text-window fs-1 text-danger"></i>
                    <h4 class="pop fw-bold">
                        <span data-bs-toggle="dropdown">Website Server</span>                        
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
            <!-- <div class="col-12 d-flex align-items-center gap-1">
                
                <button class="btn btn-dark">save changes</button>

            </div> -->
        </div>
    </section>
</template>

<script>
import { useStore } from '../stores/mainStore'
import contact from '../components/website/contact.vue'
import about from '../components/website/about.vue'
import faq from '../components/website/faq.vue'
import rules from '../components/website/rules.vue'
import services from '../components/website/services.vue'
import stories from '../components/website/stories.vue'
import whyChooseUs from '../components/website/whyChooseUs.vue'

export default {
    setup() {
        const store = useStore();
        return { store };
    },
    components:{contact,about,faq,services,rules,stories,whyChooseUs},
    data() {
        return {
            currentTab: 'contact',
            tabs: ['contact', 'about', 'faq','rules','services','stories','whyChooseUs']
        }
    }
}
</script>