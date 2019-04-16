import axios from "axios";
const state = {
  items: []
};
const getters = {
  allItems: state => state.items
};
const actions = {
  async fetchItems({ commit }) {
    const response = await axios.get("http://127.0.0.1:3000/api/items");
    commit("setItems", response.data);
  },
  async addItem({ commit }, name) {
    const response = await axios.post("http://127.0.0.1:3000/api/items", {
      name
    });
    commit("newItem", response.data);
  },
  async deleteItem({ commit }, _id) {
    await axios.delete(`http://127.0.0.1:3000/api/items/${_id}`);
    commit("removeItem", _id);
  },
  async updateItem({ commit }, updItem) {
    const response = await axios.put(
      `http://127.0.0.1:3000/api/items/${updItem._id}`,
      updItem
    );
    commit("updateItem", response.data);
  }
};
const mutations = {
  setItems: (state, items) => (state.items = items),
  newItem: (state, item) => state.items.unshift(item),
  removeItem: (state, _id) =>
    (state.items = state.items.filter(item => item._id !== _id)),
  updateItem: (state, updItem) => {
    const index = state.items.findIndex(item => item._id == updItem._id);
    if (index !== -1) {
      state.items.splice(index, 1, updItem);
    }
  }
};
export default { state, getters, actions, mutations };
