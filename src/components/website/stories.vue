<template>
    <div class="table-responsive">
        <table class="table table-hover caption-top">
            <thead>
                <tr>
                    <th>DEL</th>
                    <th scope="col">Thumbnail</th>
                    <!-- <th scope="col">Answer</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="node in store.db.websiteDatabase.stories" :key="node">
                    <td @click="removeNode(node.id)"><i class="bi bi-trash text-danger"></i></td>
                    <td><img :src="node.thumbnail" :alt="node.id" class="object-fit-contain" width="50"></td>
                    <!-- <td>{{ node.answer }}</td> -->
                </tr>
            </tbody>
        </table>
        <button @click="addNode" class="btn btn-sm btn-dark">
            <span class="spinner-grow spinner-grow-sm" v-if="spinner"></span>
            <span v-else >add new story</span>
        </button>
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
                thumbnail:''
            },

        }
    },
    methods: {
        async addNode() {
            if (confirm('Are you sure?')) {
                    this.spinner = true

                    // select image
                    var files = await utilities.openFiles()
                    if(files){

                        var files64 = [];// turn to b64
                        for(let i = 0 ; i < files.length ; i++){
                            files64.push({
                                alt:`STORY-${utilities.getCurrentDate()}`,
                                // src64: await utilities.file64(files[i])
                                src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]),0.7)
                            })
                        }

                        console.log(files64);
                        // host image

                        var res = await fetch(this.store.getApi() + "?hostImage=1",{
                            method:"POST",
                            headers:{
                                "Content-Type":"text/plain"
                            },
                            body:JSON.stringify({
                                
                                admin:this.store.admin,
                                hostImage:{
                                    folderID:"1LPacm_7Ewt82-n8__YG83RXForboij5g",
                                    images:files64
                                }
                            })
                        })
                        res = await res.json()
                        console.log(res);

                        this.addedNode.thumbnail = res[0].src

                        // save image
                        fetch(this.store.getApi() + '?addStoryRecord=1', {
                            method: "POST",
                            headers: {
                                "Content-Type": "text/plain"
                            },
                            body: JSON.stringify({
                                admin: this.store.admin,
                                addStoryRecord: this.addedNode
                            })
                        })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res);
                            if (res.status == true) {
                                this.spinner = false
                                alert('Meshe l7al')
                                this.addedNode.id = res.data
                                this.store.db.websiteDatabase.stories.push(this.addedNode)
                                this.addedNode = {
                                    thumbnail:''
                                }
                                files64 = [];
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
        },
        removeNode(id) {
            if (confirm('Are you sure?')) {
                this.spinner = true
                fetch(this.store.getApi() + '?removeStoryRecord=1', {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        admin: this.store.admin,
                        removeStoryRecord: id
                    })
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status == true) {
                        this.spinner = false
                        alert('Meshe l7al')
                        this.store.db.websiteDatabase.stories = this.store.db.websiteDatabase.stories.filter( e => {
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