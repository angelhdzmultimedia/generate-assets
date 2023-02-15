<script setup lang="ts">
const email = useState('email', () => '')
const password = useState('password', () => '')
const isLoading = useState('isLoading', () => true)
const isAuth = useState('isAuth', () => false)
const user = useState('user', () => ({
  id: '',
  name: '',
  email: '',
}))

async function login() {
  try {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.parse(payload.value),
    })
    user.value = data
    isAuth.value = true
    email.value = password.value = ''
  } catch (error) {
    alert(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    const data = await $fetch('/api/auth/user')
    user.value = data
    isAuth.value = true
  } catch (error: unknown) {
  } finally {
    isLoading.value = false
  }
})

async function logout() {
  await $fetch('/api/auth/logout')
  isAuth.value = false
  user.value = {
    id: '',
    name: '',
    email: '',
  }
}
const payload = useState(
  'payload',
  () => '{"email": "angelhdz@gmail.com", "password": "123456"}'
)
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <div v-else style="display: flex; flex-direction: column">
    <span>Is Auth: {{ isAuth }}</span>
    <span>Is Loading: {{ isLoading }}</span>
    <span>User: {{ user }}</span>
    <input v-model="payload" />
    <button @click="login">Login</button><button @click="logout">Logout</button>
  </div>
</template>
