<template>
    <div class="table-responsive">
        <table class="table table-hover caption-top">
            <thead>
                <tr>
                    <th scope="col">
                        <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                        <span v-else>#</span>
                    </th>
                    <th scope="col">Email</th>
                    <th scope="col">Joining Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="node in store.db.adminDatabase.members" :key="node">
                    <!-- <td @click="removeNode(node.id)"><i class="bi bi-trash text-danger"></i></td> -->
                    <td @dblclick="cashInUser(node.useremail)">{{ node.index }}</td>
                    <td>{{ node.useremail }}</td>
                    <td>{{ node.joiningDate }}</td>
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


        }
    },
    methods: {
        cashInUser(email) {
            if (confirm('Are you sure?')) {
                var amount = prompt('Enter Amount')
                if (Number.isInteger(parseInt(amount)) && amount > 0) {
                    this.spinner = true
                    fetch(this.store.getApi() + '?cashInUser=1', {
                        method: "POST",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        body: JSON.stringify({
                            admin: this.store.admin,
                            cashInUser: {
                                email,
                                amount
                            }
                        })
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res);
                            if (res === true) {
                                this.spinner = false
                                alert('Meshe l7al')

                            } else {
                                this.spinner = false
                                alert(new Error(res))
                            }

                        })
                        .catch(err => {
                            this.spinner = false
                            alert(err)
                        })

                } else alert('Invalid Input')
            }
        }
    }
}
</script>