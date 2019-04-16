<template>
  <div>
    <h3>Items</h3>
    <div class="items">
      <div v-for="item in allItems" :key="item._id" class="item">
        {{ item.name }}
        <button @click="deleteItem(item._id)">X</button>
        <button @click="marking(item._id)">E</button>
        <div v-if="item._id==markedId">
          <form @submit="update">
            <input type="text" name="name" v-model="newData">
            <input type="submit" value="Submit">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Items",
  data() {
    return {
      markedId: "",
      newData: ""
    };
  },
  methods: {
    ...mapActions(["fetchItems", "deleteItem", "updateItem"]),
    marking(_id) {
      if (this.markedId == _id) {
        this.markedId = "";
      } else {
        this.markedId = _id;
        this.newData = "";
      }
    },
    update(e) {
      e.preventDefault();
      const updItem = {
        _id: this.markedId,
        name: this.newData
      };
      this.updateItem(updItem);
      this.markedId = "";
      this.newData = "";
    }
  },
  computed: mapGetters(["allItems"]),
  created() {
    this.fetchItems();
  }
};
</script>

<style scoped>
.items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.item {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
}
@media (max-width: 500px) {
  .items {
    grid-template-columns: 1fr;
  }
}
</style>