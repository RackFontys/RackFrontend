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

    <BFormGroup id="input-group-2" label="Your Name:" label-for="input-2">
      <BFormInput name="name" id="input-2" v-model="form.name" placeholder="Enter name" required />
    </BFormGroup>
    <BFormGroup id="input-group-3" label="Password:" label-for="input-3">
      <BFormInput name="password" id="input-3" v-model="form.password" type="password" required />
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

const router = useRouter();

const form = reactive({
  id: 0,
  name: "",
  email: "",
  createdAt: Date.now(),
  companyId: 0,
  password: ""
})
const show = ref(true)

const onSubmit = async (event) => {
  event.preventDefault();
  try {
    await register();
    alert("Registration successful!");
    await router.push('/'); // Navigate to the home page or login page after registration
  } catch (err) {
    console.error(err);
    alert("Registration failed!");
  }
}

const onReset = (event) => {
  event.preventDefault()
  // Reset our form values
  form.email = ''
  form.name = ''
  form.password = null
  // Trick to reset/clear native browser form validation state
  show.value = false
  nextTick(() => {
    show.value = true
  })
}

const register = async() => {
  const now = new Date();
  const date = now.toISOString()

  await axios.post('/User', {
      name: form.name,
      email: form.email,
      createdAt: date,
      companyId: form.companyId,
      password: form.password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
}
</script>

<style scoped>

</style>