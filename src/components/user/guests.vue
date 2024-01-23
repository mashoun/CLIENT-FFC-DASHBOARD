<template>
    <div class="table-responsive">
        <table class="table table-hover caption-top">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Number</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Starting Time</th>
                    <th scope="col">Ending Time</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="node in store.db.adminDatabase.guests" :key="node">
                    <!-- <td @click="removeNode(node.id)"><i class="bi bi-trash text-danger"></i></td> -->
                    <td>{{ node.index }}</td>
                    <td>{{ node.id }}</td>
                    <td>{{ node.name }}</td>
                    <td>{{ node.email }}</td>
                    <td>{{ node.number }}</td>
                    <td>{{ utilities.formatDate(node.timestamp) }}</td>
                    <td>{{ utilities.formatDate(node.startingTime) }}</td>
                    <td>{{ utilities.formatDate(node.endingTime) }}</td>

                </tr>
            </tbody>
        </table>
        <button @click="" data-bs-toggle="modal" data-bs-target="#bookInGuestModal" class="btn btn-sm btn-dark mb-3">
            <span class="spinner-grow spinner-grow-sm" v-if="spinner"></span>
            <span v-else class="slab">BookIn A Guest</span>
        </button>

        <!-- Modal -->
        <div class="modal fade" id="bookInGuestModal" tabindex="-1" aria-labelledby="bookInGuestModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 slab" id="bookInGuestModalLabel">BookIn A Guest</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <section class="d-flex gap-3 flex-column">
                            <div class="d-flex gap-3">
                                <small style="width: 150px;">Service:</small>
                                <select v-model="bookInForm.service.name" class="form-select">
                                    <option v-for="node in store.db.adminDatabase.services" :value="node.title">
                                        {{ node.title }}</option>
                                </select>
                            </div>
                            <hr>

                            <div class="d-flex gap-3">
                                <small style="width: 150px;">Guest Name:</small>
                                <input v-model="bookInForm.name" type="text" class="form-control">
                            </div>
                            <div class="d-flex gap-3">
                                <small style="width: 150px;">Guest ID:</small>
                                <input v-model="bookInForm.id" type="number" class="form-control">
                            </div>
                            <div class="d-flex gap-3">
                                <small style="width: 150px;">Guest Email:</small>
                                <input v-model="bookInForm.email" type="text" class="form-control">
                            </div>
                            <div class="d-flex gap-3">
                                <small style="width: 150px;">Guest Number:</small>
                                <input v-model="bookInForm.number" type="number" class="form-control">
                            </div>
                            <hr>


                            <div class="d-flex gap-3">
                                <small style="width: 150px;">Date:</small>
                                <input v-model="bookInForm.startingTime.date" type="date" class="form-control">
                            </div>

                            <hr>
                            <div class="d-flex gap-3">
                                <small style="width: 150px;">Starting Time:</small>
                                <input v-model="bookInForm.startingTime.time" type="time" class="form-control">
                            </div>
                            <div class="d-flex gap-3">
                                <small style="width: 150px;">Ending Time:</small>
                                <input v-model="bookInForm.endingTime.time" type="time" class="form-control">
                            </div>

                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="bookInGuest">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
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
            bookInForm: {
                service: {
                    name: '',
                    id: ''
                },
                id: '',
                name: '',
                email: '',
                number: '',
                startingTime: {
                    date: '',
                    time: ''
                },
                endingTime: {
                    date: '',
                    time: ''
                }
            }
        }
    },
    methods: {
        getServiceId() {
            // this.store.db.adminDatabase.services.forEach(s => {
            //     // console.log(s);
            //     // console.log(name);
            //     if (s.title == this.bookInForm.service.name) {
            //         // console.log(s.id);
            //         return s.id
            //     }
            // })

            for (let i = 0; i < this.store.db.adminDatabase.services.length; i++) {
                if (this.store.db.adminDatabase.services[i].title == this.bookInForm.service.name) return this.store.db.adminDatabase.services[i].id
            }

            return false
        },
        test() {
            alert(this.getServiceId())
        },
        bookInGuest() {
            if (confirm('Are you sure?')) {
                var bObj = {
                    index: this.store.db.adminDatabase.guests.length + 1,
                    id: this.bookInForm.id,
                    name: this.bookInForm.name,
                    email: this.bookInForm.email,
                    number: this.bookInForm.number,

                    serviceId: this.getServiceId(),
                    serviceName: this.bookInForm.service.name,
                    timestamp: new Date(),
                    startingTime: `${this.bookInForm.startingTime.date} ${this.bookInForm.startingTime.time}`,
                    endingTime: `${this.bookInForm.startingTime.date} ${this.bookInForm.endingTime.time}`,

                }
                this.spinner = true
                fetch(this.store.getApi() + "?bookForAGuest=1", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        admin: this.store.admin,
                        bookForAGuest: {
                            idn: this.bookInForm.id,
                            name: this.bookInForm.name,
                            email: this.bookInForm.email,
                            number: this.bookInForm.number,

                            serviceId: this.getServiceId(),
                            serviceName: this.bookInForm.service.name,

                            startTime: `${this.bookInForm.startingTime.date} ${this.bookInForm.startingTime.time}`,
                            endTime: `${this.bookInForm.startingTime.date} ${this.bookInForm.endingTime.time}`,

                        }
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        if (res === true) {
                            this.spinner = false
                            alert('Meshe l7al')
                            console.log(bObj);
                            this.store.db.adminDatabase.guests.push(bObj)

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