<template>
    <div class="table-responsive">
        <table class="table table-hover caption-top">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th scope="col">Title</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Availability</th>
                    <th scope="col">Range</th>
                    <th scope="col">Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td @click="addNode">
                        <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                        <i v-else role="button" class="bi bi-plus-circle-fill fs-4 text-primary"></i>
                    </td>
                    <td></td>
                    <td><input class="form-control fs-smaller" style="min-width: 250px;" v-model="addedNode.title"></td>
                    <td><input class="form-control fs-smaller" style="min-width: 250px;" v-model="addedNode.capacity"></td>
                    <td><input class="form-control fs-smaller" style="min-width: 250px;" v-model="addedNode.duration"></td>
                    <td><input class="form-control fs-smaller" style="min-width: 250px;" v-model="addedNode.availability">
                    </td>
                    <td><input class="form-control fs-smaller" style="min-width: 250px;" v-model="addedNode.range"></td>
                    <td><input class="form-control fs-smaller" style="min-width: 250px;" v-model="addedNode.cost"></td>
                </tr>
                <tr v-for="node in store.db.adminDatabase.services" :key="node">
                    <td @click="removeNode(node.id)"><i class="bi bi-trash text-danger"></i></td>
                    <!-- <td data-bs-toggle="modal" data-bs-target="#breakAction" @click="updatedNode = node"><i
                            class="bi bi-calendar-x text-dark"></i></td> -->

                    <td @click="updatedNode = node" data-bs-toggle="modal" data-bs-target="#updateModal">
                        <i class="bi bi-pencil-square text-success"></i>
                    </td>
                    <td>{{ node.title }}</td>
                    <td>{{ node.capacity }}</td>
                    <td>{{ node.duration }}</td>
                    <td @dblclick="copyText(node.availability)"><p v-for="a in node.availability.split(',')" :key="a">{{ a }}</p></td>
                    <td>{{ node.range }}</td>
                    <td>{{ node.cost }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- The Update Modal -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="updateModalLabel">Update</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <section class="d-flex flex-column gap-3">
                        <div class="d-flex gap-3 align-items-center">
                            <h6 style="width: 150px;">Title</h6>
                            <input v-model="updatedNode.title" type="text" placeholder="Title" class="form-control">
                        </div>
                        <div class="d-flex gap-3 align-items-center">
                            <h6 style="width: 150px;">Capacity</h6>
                            <input v-model="updatedNode.capacity" type="number" placeholder="Capacity" class="form-control">
                        </div>
                        <div class="d-flex gap-3 align-items-center">
                            <h6 style="width: 150px;">Duration</h6>
                            <input v-model="updatedNode.duration" type="text" placeholder="Duration" class="form-control">
                        </div>
                        <div class="d-flex gap-3 align-items-center">
                            <h6 style="width: 150px;">Availability</h6>
                            <textarea v-model="updatedNode.availability" class="form-control" rows="4"
                                placeholder="Availability"></textarea>
                        </div>
                        <div class="d-flex gap-3 align-items-center">
                            <h6 style="width: 150px;">Range</h6>
                            <input v-model="updatedNode.range" type="number" placeholder="Range" class="form-control">
                        </div>
                        <div class="d-flex gap-3 align-items-center">
                            <h6 style="width: 150px;">Cost</h6>
                            <input v-model="updatedNode.cost" type="number" placeholder="Cost" class="form-control">
                        </div>








                        <!-- <div class="">
                            <small class="slab">Range: 30 - {{ inputRange }} min</small>
                            <input v-model="inputRange" type="range" placeholder="Capacity" class="form-range" min="30" max="180" step="5">
                        </div> -->

                        <!-- <div class="">
                            <select class="form-select">
                                <option value="MONDAY">MONDAY</option>
                                <option value="TUESDAY">TUESDAY</option>
                                <option value="WEDNESDAY">WEDNESDAY</option>
                                <option value="THURSDAY">THURSDAY</option>
                                <option value="FRIDAY">FRIDAY</option>
                                <option value="SATURDAY">SATURDAY</option>
                                <option value="SUNDAY">SUNDAY</option>
                            </select>
                        </div> -->

                    </section>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="updateNode">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- The Break action modal -->
    <div class="modal fade" id="breakAction" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Break Action - {{ updatedNode.title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex gap-4 flex-column">

                        <!-- <p class="text-center">This is used when you are going to be closed for some reason</p> -->
                        
                        <div class="d-flex gap-3">
                            <span style="width: 200px; !important">Select Date</span>
                            <input v-model="breakAction.date" type="date" class="form-control">
                        </div>
                        <div class="d-flex gap-3">
                            <span style="width: 200px; !important">Time IN</span>
                            <input v-model="breakAction.timeIn" type="time" class="form-control">
                        </div>

                        <div class="d-flex gap-3">
                            <span style="width: 200px; !important">Time OUT</span>
                            <input v-model="breakAction.timeOut" type="time" class="form-control">
                        </div>
                        <textarea v-model="breakAction.message" class="form-control"
                            placeholder="Notification message.."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-if="spinner" type="button" class="btn btn-primary"><span class="spinner-grow spinner-grow-sm"></span></button>
                    <button v-if="!spinner" type="button" class="btn btn-primary">Save changes</button>
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
            addedNode: {
                title: '',
                capacity: '',
                duration: '',
                availability: '',
                range: '',
                cost: ''
            },
            updatedNode: {
                title: '',
                capacity: '',
                duration: '',
                availability: '',
                range: '',
                cost: '',
            },
            breakAction: {
                date: '',
                timeIn: '',
                timeOut: '',
                message: ''
            }

        }
    },
    methods: {
        copyText(text){
            navigator.clipboard.writeText(text)
            alert(`COPIED: ${text}`)
        },
        addNode() {
            if (!utilities.isEmptyObj(this.addedNode)) {
                if (confirm('Are you sure?')) {
                    this.spinner = true
                    fetch(this.store.getApi() + '?addAdminService=1', {
                        method: "POST",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        body: JSON.stringify({
                            admin: this.store.admin,
                            addAdminService: this.addedNode
                        })
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res);
                            if (res.status == true) {
                                this.spinner = false
                                alert('Meshe l7al')
                                this.addedNode.id = res.data
                                this.store.db.adminDatabase.services.push(this.addedNode)
                                this.addedNode = {
                                    title: '',
                                    capacity: '',
                                    duration: '',
                                    availability: '',
                                    range: '',
                                    cost: ''
                                }
                            } else {
                                this.spinner = false
                                alert(new Error(res.data))
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
                fetch(this.store.getApi() + '?removeAdminService=1', {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        admin: this.store.admin,
                        removeAdminService: id
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        if (res.status == true) {
                            this.spinner = false
                            alert('Meshe l7al')
                            this.store.db.adminDatabase.services = this.store.db.adminDatabase.services.filter(e => {
                                return e.id != id
                            })


                        } else {
                            this.spinner = false
                            alert(res.data)
                        }

                    })
                    .catch(err => {
                        this.spinner = false
                        alert(err)
                    })
            }
        },
        updateNode() {
            if (confirm('Are you sure?')) {
                this.spinner = true
                fetch(this.store.getApi() + '?updateAdminService=1', {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        admin: this.store.admin,
                        updateAdminService: {
                            id: this.updatedNode.id,
                            service: this.updatedNode
                        }
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        if (res === true) {
                            this.spinner = false
                            alert('Meshe l7al')
                            this.store.db.adminDatabase.services[parseInt(this.updatedNode.index) - 1] = this.updatedNode


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
        },

        breakAction() {
            if (confirm('Are you sure?')) {
                this.spinner = true
                fetch(this.store.getApi() + '?breakAction=1', {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({

                        admin: this.store.admin,
                        breakAction: {
                            serviceId: this.updatedNode.id,
                            message: this.breakAction.message,
                            timeIn: `${this.breakAction.date} ${this.breakAction.timeIn}`,
                            timeOut: `${this.breakAction.date} ${this.breakAction.timeOut}`,
                        }
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        this.spinner = false
                        alert('Meshe L7al')
                    })
                    .catch(err => {
                        console.log(err);
                        this.spinner = false
                        alert(err)
                    })
            }
        }
    }
}
</script>