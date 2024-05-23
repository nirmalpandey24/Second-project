<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-50 to-gray-100">
      <div class="items-center space-y-8 p-10 bg-white rounded-lg relative">
        <div class="bg-gray-100 -z-10 rounded-lg absolute inset-0"></div>
  
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Artist Account</h2>
        </div>
  
        <form @submit.prevent="signup" class="space-y-4">
          <div class="space-y-4">
            <div>
              <label for="email-address">Email address</label>
              <input
                v-model="form.email"
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Email address"
              />
            </div>
  
            <div>
              <label for="first_name">First Name</label>
              <input
                v-model="form.first_name"
                id="first_name"
                name="first_name"
                type="text"
                required
                class="rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="First Name"
              />
            </div>
  
            <div>
              <label for="last_name">Last Name</label>
              <input
                v-model="form.last_name"
                id="last_name"
                name="last_name"
                type="text"
                required
                class="rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Last Name"
              />
            </div>
  
            <div>
              <label for="date_of_birth">Date of Birth</label>
              <input
                v-model="form.date_of_birth"
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                required
                class="rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Date of Birth"
              />
            </div>
  
            <div>
              <label for="gender">Gender</label>
              <select
                v-model="form.gender"
                id="gender"
                name="gender"
                class="rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
  
            <div>
              <label for="address">Address</label>
              <input
                v-model="form.address"
                id="address"
                name="address"
                type="text"
                required
                class="rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Address"
              />
            </div>
  
            <div>
              <label for="country">Country</label>
              <input
                v-model="form.country"
                id="country"
                name="country"
                type="text"
                required
                class="rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Country"
              />
            </div>
  
            <div>
              <label for="password">Password</label>
              <input
                v-model="form.password"
                id="password"
                name="password"
                type="password"
                required
                class="rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Password"
              />
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          email: '',
          first_name: '',
          last_name: '',
          date_of_birth: '',
          gender: '',
          address: '',
          country: '',
          password: ''
        }
      };
    },
    methods: {
      async signup() {
        try {
          const response = await fetch('http://localhost:8000/api/artists/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.form)
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('Artist created successfully:', data);
            this.$router.push('/login');
          } else {
            const errorData = await response.json();
            console.error('Error creating artist:', errorData);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      }
    }
  };
  </script>