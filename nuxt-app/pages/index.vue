<script setup lang="ts">
const user = useState('useṙ', () => ({
  email: '',
  id: '',
  name: '',
}))
const isLoading = useState('isLoading', () => true)
const isAuth = useState('isAuth', () => false)

onMounted(async () => {
  try {
    const data = await $fetch('/api/auth/user')
    user.value = { ...data }
    isAuth.value = true
  } catch (error: unknown) {
    user.value = {
      email: '',
      id: '',
      name: '',
    }
  } finally {
    isLoading.value = false
  }
})

async function logout() {
  await $fetch('/api/auth/logout')
  navigateTo('/login')
}
</script>

<template>
  <h1>Index Page</h1>
  <button @click="$router.push('/login')">Login</button>
  <span v-if="isLoading">Loading...</span>
  <div v-else-if="isAuth">
    <pre>{{ user }}</pre>
    <button @click="logout">Logout</button>
  </div>
</template>
