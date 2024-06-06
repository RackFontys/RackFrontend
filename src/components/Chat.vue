<script setup>
import { ref } from 'vue';
import UserList from './UserList.vue';
// import ChatHistory from './ChatHistory.vue';

const selectedUser = ref(null);
const userId = localStorage.getItem('userId');

const selectUser = (user) => {
  selectedUser.value = user;
};
</script>

<template>
  <div v-if="userId">
    <BContainer fluid>
      <BRow>
        <BCol cols="3">
          <UserList @select-user="selectUser" :selected-user="selectedUser" />
        </BCol>
        <BCol cols="9">
          <ChatHistory :selected-user="selectedUser" />
        </BCol>
      </BRow>
    </BContainer>
  </div>
  <div v-else class="col-12">
    <h1>Welcome</h1>
    <h3>
      Make sure to login to your account.
    </h3>
  </div>
</template>

<style scoped>

</style>