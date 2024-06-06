<template>
  <div>
    <BListGroup>
      <BListGroupItem
          v-for="user in users"
          :key="user.id"
          :active="user.id === selectedUser?.id"
          @click="selectUser(user)"
          action
      >
        {{ user.name }}
      </BListGroupItem>
    </BListGroup>
    <BButton variant="primary" class="mb-2 w-100" @click="addUser">Add New User</BButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
  { id: 4, name: 'User 4' },
  { id: 5, name: 'User 5' },
  { id: 6, name: 'User 6' },
  { id: 7, name: 'User 7' },
  { id: 8, name: 'User 8' },
  { id: 9, name: 'User 9' },
  { id: 10, name: 'User 10' },
]);

const props = defineProps({
  selectedUser: Object,
});

const emit = defineEmits(['select-user']);

const selectUser = (user) => {
  emit('select-user', user);
};

const addUser = () => {
  const newUser = {
    id: users.value.length + 1,
    name: `User ${users.value.length + 1}`
  };
  users.value.push(newUser);
};
</script>