<template>
  <BForm @submit="onSubmit" @reset="onReset" v-if="show">
    <BFormGroup
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
    >
      <BFormInput
          name="email"
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
      />
    </BFormGroup>
    <BFormGroup id="input-group-2" label="Password:" label-for="input-3">
      <BFormInput name="password" id="input-2" v-model="form.password" type="password" required />
    </BFormGroup>

    <BButton type="submit" variant="primary">Submit</BButton>
    <BButton type="reset" variant="danger">Reset</BButton>
  </BForm>

  <BCard class="mt-3" header="Form Data Result">
    <pre class="m-0">{{ form }}</pre>
  </BCard>
</template>

<script setup lang="ts">
import {nextTick, reactive, ref} from "vue";
import axios from "../axios.js";
import { useRouter } from 'vue-router';
import VueJwtDecode from "vue-jwt-decode";

const router = useRouter();

const form = reactive({
  email: "",
  password: ""
})
const show = ref(true)

const onSubmit = async (event) => {
  event.preventDefault();
  try {
    await login(form.email, form.password);
    alert("Login successful!");
    await router.push('/');
  } catch (err) {
    console.error(err);
    alert("Login failed!");
  }
}

const onReset = (event) => {
  event.preventDefault()
  form.email = ''
  form.password = null
}

const login = async(email, password) => {
  await axios.get('/User?email=' + email + '&password=' + password + '').then(res => {
    localStorage.setItem('jwt', res.data);
    const decodedJWT = VueJwtDecode.decode(res.data);
    localStorage.setItem('userName', decodedJWT.userName);
    localStorage.setItem('userId', decodedJWT.userId);
  }).catch(err => {
    console.log(err);
  });
}
</script>

<style scoped>

</style>