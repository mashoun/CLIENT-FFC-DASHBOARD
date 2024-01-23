<template>
    <div class="table-responsive">
        <table class="table table-hover caption-top">
            <thead>
                <tr>
                    <th>DEL</th>
                    <th scope="col">Note</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td @click="addNode">
                        <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                        <i v-else role="button" class="bi bi-plus-circle-fill fs-4 text-primary"></i>
                    </td>
                    <td><input class="form-control fs-smaller" style="min-width: 250px;" v-model="addedNode.note"></td>
                </tr>
                <tr v-for="node in store.db.websiteDatabase.whyChooseUs" :key="node">
                    <td @click="removeNode(node.id)"><i class="bi bi-trash text-danger"></i></td>
                    <td>{{ node.note }}</td>
                </tr>
            </tbody>
        </table>
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
                note:''
            },

        }
    },
    methods: {
        addNode() {
            if (!utilities.isEmptyObj(this.addedNode)) {
                if (confirm('Are you sure?')) {
                    this.spinner = true
                    fetch(this.store.getApi() + '?addWhyChoosUsRecord=1', {
                        method: "POST",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        body: JSON.stringify({
                            admin: this.store.admin,
                            addWhyChoosUsRecord: this.addedNode
                        })
                    })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        if (res.status == true) {
                            this.spinner = false
                            alert('Meshe l7al')
                            this.addedNode.id = res.data
                            this.store.db.websiteDatabase.whyChooseUs.push(this.addedNode)
                            this.addedNode = {
                                rule:''
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
                fetch(this.store.getApi() + '?removeWhyChoosUsRecord=1', {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        admin: this.store.admin,
                        removeWhyChoosUsRecord: id
                    })
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status == true) {
                        this.spinner = false
                        alert('Meshe l7al')
                        this.store.db.websiteDatabase.whyChooseUs = this.store.db.websiteDatabase.whyChooseUs.filter( e => {
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