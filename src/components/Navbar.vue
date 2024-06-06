<script setup>
import {ref, onMounted, nextTick} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userName = ref(''); // Use ref to make userName reactive

const logout = async () => {
  await localStorage.clear();
  userName.value = null; // Update the ref value
  await router.push('/'); // Navigate to the home page or login page after logout
};

const checkUserName = () => {
  userName.value = localStorage.getItem('userName'); // Ensure userName is updated
};

onMounted(() => {
  checkUserName();
});
</script>

<template>
  <BNavbar toggleable="lg" variant="primary">
    <BNavbarBrand :to="{ path: '/' }">Rack</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <BNavItem :to="{ path: '/chat' }">Chat</BNavItem>
      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em v-if="userName">{{ userName }}</em>
            <em v-else>Account</em>
          </template>
          <BDropdownItem href="#" v-if="userName">Profile</BDropdownItem>
          <BDropdownItem @click="logout" v-if="userName">Sign Out</BDropdownItem>
          <BDropdownItem :to="{ path: '/register' }" v-if="!userName">Register</BDropdownItem>
          <BDropdownItem :to="{ path: '/login' }" v-if="!userName">Login</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script>
export default {
  name: "navbar"
}
</script>

<style scoped>

</style>