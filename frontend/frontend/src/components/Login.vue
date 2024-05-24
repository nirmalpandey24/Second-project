<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('src/assets/image.avif')">
    <div class="bg-gray-500 opacity-70 p-10 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-center text-4xl font-extrabold text-gray-900 mb-6">Login</h2>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="email-address" class="block text-sm font-medium text-white text-bold">Email address</label>
          <div class="mt-1">
            <input
              v-model="form.email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-white   text-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              placeholder="Email address"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm  text-white font-bold">Password</label>
          <div class="mt-1">
            <input
              v-model="form.password"
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              class="h-4 w-4 text-white focus:ring-black border-gray-300 rounded font-bold"
            />
            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <router-link to="/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </router-link>
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

        <div class="text-center mt-4">
          <router-link to="/signup" class="text-white font-bold hover:text-indigo-700 text-lg">
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
.bg-cover {
  background-size: cover;
  background-position: center;
}
</style>
