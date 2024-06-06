<template>
  <div v-if="selectedUser">
    <h3>Chat with {{ selectedUser.name }}</h3>
    <BListGroup>
      <BListGroupItem
          v-for="message in messages"
          :key="message.id"
      >
        <strong>{{ getSenderName(message) }}:</strong> {{ message.message }}
      </BListGroupItem>
    </BListGroup>
    <BForm @submit="onSubmit">
      <BFormGroup
          id="input-group-1"
      >
        <BFormInput
            id="input-1"
            type="text"
            v-model="form.message"
            placeholder="Send a message..."
        />
      </BFormGroup>

      <BButton type="submit" variant="primary">Submit</BButton>
    </BForm>
  </div>
  <div v-else>
    <p>Select a user to view the chat history.</p>
  </div>
</template>

<script setup>
import {reactive, ref, watch} from 'vue';
import axios from "@/axios.js";

const props = defineProps({
  selectedUser: Object,
});

const messages = ref([]);
const userId = localStorage.getItem('userId');

watch(() => props.selectedUser, (newUser) => {
  if (newUser) {
    messages.value = fetchMessagesForUser(userId, newUser.id);
  } else {
    messages.value = [];
  }
});

const getSenderName = (message) => {
  return message.userId === props.selectedUser.id ? props.selectedUser.name : 'You';
};

const fetchMessagesForUser = async (userId, toUserId) => {
  await axios.get('/Message?userId=' + userId + '').then(res => {
    messages.value = res.data.filter(
        (msg) => msg.userId === userId || msg.toUserId === userId || msg.userId === toUserId || msg.toUserId === toUserId
    );
  }).catch(err => {
    console.log(err);
  });
};

const form = reactive({
  message: ''
})

const onSubmit = async (event) => {
  event.preventDefault();
  try {
    if (form.message !== '')
    {
      await sendMessage();
    }
  } catch (err) {
    console.error(err);
  }
}

const sendMessage = async() => {
  const now = new Date();
  const date = now.toISOString();

  await axios.post('/Message', {
    userId: userId,
    toUserId: props.selectedUser.id,
    message: form.message,
    createdAt: date,
    readStatus: 0
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    form.message = '';
    messages.value.push(res.data);
  }).catch(err => {
    console.log(err);
  });
}
</script>