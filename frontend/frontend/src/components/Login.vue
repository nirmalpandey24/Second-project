<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-50 to-gray-100">
    <div class="p-10 bg-white rounded-lg shadow-lg">
      <div class="bg-gray-100 -z-10 rounded-lg absolute inset-0"></div>

      <div>
        <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900">Login</h2>
      </div>

      <form @submit.prevent="login" class="mt-8 space-y-6">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <div class="mt-1 rounded-md shadow-sm">
            <input
              v-model="form.email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              placeholder="Email address"
            />
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>
          <div class="mt-1 rounded-md shadow-sm">
            <input
              v-model="form.password"
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>

        <div class="text-center">
          <router-link to="/signup" class="text-indigo-600 hover:text-indigo-700 text-lg">
            Don't have an account? Sign up here.
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      axios
        .post('http://127.0.0.1:8000/api/login/', this.form)
        .then(response => {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          alert('Logged in successfully!');
          console.log(response.data);
          if (response.data.user.is_superuser) {
            this.$router.push('/admin');
          } else if (response.data.user.is_artist) {
            this.$router.push('/artist');
          } else {
            alert('User role not recognized. Redirecting to login.');
            this.$router.push('/login');
          }
        })
        .catch(error => {
          console.error('Error logging in:', error);
          alert('Invalid credentials. Please try again.');
        });
    },
  },
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
