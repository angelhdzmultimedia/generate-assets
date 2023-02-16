<script setup lang="ts">
const email = useState('email', () => '')
const password = useState('password', () => '')

async function login() {
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })
    email.value = password.value = ''
    navigateTo('/')
  } catch (error: unknown) {
    alert(error)
  }
}
</script>

<template>
  <h1>Login Page</h1>
  <input v-model="email" placeholder="Email" />
  <input v-model="password" placeholder="Password" type="password" />
  <button @click="login">Login</button>
</template>
