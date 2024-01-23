<template>
  <div class="table-responsive">
    <table class="table table-hover caption-top">
      <thead>
        <tr>
          <th scope="col">Key</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in store.db.websiteDatabase.contact" :key="key">
          <td>{{ key }}</td>
          <!-- <td :ref="key" contenteditable @keyup="trackEdit(key)">{{ value }}</td> -->
          <td><textarea class="form-control fs-smaller" rows="3" v-model="store.db.websiteDatabase.contact[key]"></textarea></td>
        </tr>
      </tbody>
    </table>
    <button @click="setNode" class="btn btn-sm btn-dark" :disabled="spinner" style="width: 100px;">
      <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
      <span v-else>save changes</span>
    </button>
  </div>
</template>
<script>
import { useStore } from '../../stores/mainStore';
export default {
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {
      spinner: false,

    }
  },
  methods: {
    trackEdit(key) {
      this.store.db.websiteDatabase.contact[key] = this.$refs[key][0].innerText
    },
    setNode() {
      if (confirm('Are you sure?')) {
        this.spinner = true
        fetch(this.store.getApi() + '?setContact=1', {
          method: "POST",
          headers: {
            "Content-Type": "text/plain"
          },
          body: JSON.stringify({
            admin:this.store.admin,
            setContact:this.store.db.websiteDatabase.contact
          })
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.spinner = false
          alert('Meshe l7al')
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