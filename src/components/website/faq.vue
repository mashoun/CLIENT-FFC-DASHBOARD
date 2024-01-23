<template>
    <div class="table-responsive">
        <table class="table table-hover caption-top">
            <thead>
                <tr>
                    <th></th>
                    <th scope="col">Question</th>
                    <th scope="col">Answer</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td @click="addNode">
                        <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                        <i v-else role="button" class="bi bi-plus-circle-fill fs-4 text-primary"></i>
                    </td>
                    <td><input class="form-control fs-smaller" style="min-width: 250px;" v-model="addedNode.question"></td>
                    <td><input class="form-control fs-smaller" style="min-width: 250px;" v-model="addedNode.answer"></td>
                </tr>
                <tr v-for="node in store.db.websiteDatabase.faq" :key="node">
                    <td @click="removeNode(node.id)"><i class="bi bi-trash text-danger"></i></td>
                    <td>{{ node.question }} {{ node.id }}</td>
                    <td>{{ node.answer }}</td>
                </tr>
            </tbody>
        </table>
        <!-- <button class="btn btn-sm btn-dark">add new faq</button> -->
    </div>
</template>
<script>
import { useStore } from '../../stores/mainStore';
import utilities from '../../utilities.js'
export default {
    setup() {
        const store = useStore();
        return { store };
    },
    data() {
        return {
            utilities,
            spinner: false,
            addedNode: {
                question: '',
                answer: ''
            },

        }
    },
    methods: {
        addNode() {
            if (!utilities.isEmptyObj(this.addedNode)) {
                if (confirm('Are you sure?')) {
                    this.spinner = true
                    fetch(this.store.getApi() + '?addFaqRecord=1', {
                        method: "POST",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        body: JSON.stringify({
                            admin: this.store.admin,
                            addFaqRecord: this.addedNode
                        })
                    })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        if (res.status == true) {
                            this.spinner = false
                            alert('Meshe l7al')
                            this.addedNode.id = res.data
                            this.store.db.websiteDatabase.faq.push(this.addedNode)
                            this.addedNode = {
                                question: '',
                                answer: ''
                            }
                        } else {
                            this.spinner = false
                            alert(new Error(res))
                        }

                    })
                    .catch(err => {
                        this.spinner = false
                        alert(err)
                    })
                }
            } else alert('Invalid input')
        },
        removeNode(id) {
            if (confirm('Are you sure?')) {
                this.spinner = true
                fetch(this.store.getApi() + '?removeFaqRecord=1', {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        admin: this.store.admin,
                        removeFaqRecord: id
                    })
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status == true) {
                        this.spinner = false
                        alert('Meshe l7al')
                        this.store.db.websiteDatabase.faq = this.store.db.websiteDatabase.faq.filter( e => {
                            return e.id != id
                        })

                        
                    } else {
                            this.spinner = false
                            alert(new Error(res))
                        }

                })
                .catch(err => {
                    this.spinner = false
                    alert(err)
                })
            }
        }
    }
}
</script>