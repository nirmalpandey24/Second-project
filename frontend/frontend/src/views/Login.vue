<template>
  <div class="flex justify-center items-center h-screen" style="background-image: url('src/assets/image.avif'); background-size: cover;">
    <div class="w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form @submit.prevent="login" class="bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4 border-10 border-gray-300">
        <div class="mb-4">
          <label for="email" class="block text-white text-sm font-bold mb-2">Email:</label>
          <input type="email" id="email" v-model="email" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6">
          <label for="password" class="block text-white text-sm font-bold mb-2">Password:</label>
          <input type="password" id="password" v-model="password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
        <router-link to="/" class="block text-center mt-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Click here to register</button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      csrfToken: null,
    };
  },
  methods: {
    login() {
      axios.post('http://127.0.0.1:8000/api/login', {
        email: this.email,
        password: this.password
      }, {
        headers: {
          'X-CSRFToken': this.csrfToken // Use the stored CSRF token
        }
      })
      .then(response => {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        const role = response.data.role;

        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        
        if (role === 'admin') {
          this.$router.push({ name: 'UserPage' });
        } else if (role === 'artist') {
          this.$router.push({ name: 'ArtistPage' });
        } else {
          console.error('Unknown role:', role);
        }
      })
      .catch(error => {
        // Handle login failure
        console.error('Login failed:', error);
      });
    },
    getCSRFToken() {
      axios.get('http://127.0.0.1:8000/api/get-csrf-token')
      .then(response => {
        this.csrfToken = response.data.csrftoken;
      })
      .catch(error => {
        console.error('Error getting CSRF token:', error);
      });
    },
  },
  mounted() {
    this.getCSRFToken();
  }
};
</script>

<style scoped>
/* Add your scoped styles here if needed */
</style>
