<template>
  <div
    class="bg-green-200 min-h-screen flex justify-center items-center"
    style="background-image: url('src/assets/image.avif'); background-size: cover"
  >
    <div class="max-w-xl w-full bg-gray-500 rounded-lg p-8 opacity-90">
      <form @submit.prevent="signup" class="space-y-4 opacity-70">
        <div>
          <label for="email" class="text-white block">Email:</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="input-field"
          />
        </div>
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <label for="first_name" class="text-white block">First Name:</label>
            <input
              type="text"
              id="first_name"
              v-model="form.first_name"
              required
              class="input-field"
            />
          </div>
          <div class="w-full md:w-1/2 px-2">
            <label for="last_name" class="text-white block">Last Name:</label>
            <input
              type="text"
              id="last_name"
              v-model="form.last_name"
              required
              class="input-field"
            />
          </div>
        </div>
        <div>
          <label for="date_of_birth" class="text-white block">Date of Birth:</label>
          <input
            type="date"
            id="date_of_birth"
            v-model="form.date_of_birth"
            required
            class="input-field"
          />
        </div>
        <div>
          <label for="gender" class="text-white block">Gender:</label>
          <select
            id="gender"
            v-model="form.gender"
            required
            class="input-field"
          >
            <option value="" disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label for="address" class="text-white block">Address:</label>
          <input
            type="text"
            id="address"
            v-model="form.address"
            required
            class="input-field"
          />
        </div>
        <div>
          <label for="country" class="text-white block">Country:</label>
          <input
            type="text"
            id="country"
            v-model="form.country"
            required
            class="input-field"
          />
        </div>
        <div>
          <label for="password" class="text-white block">Password:</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            class="input-field"
          />
        </div>
        <button type="submit" class="btn btn-success">Create Account</button>
      </form>
      <router-link to="/" class="block text-center mt-4">
        <button class="btn btn-primary">GO TO SIGNIN</button>
      </router-link>
      <CustomToast :message="toastMessage" v-if="toastMessage" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import CustomToast from '@/components/CustomToast.vue';

export default {
  components: {
    // CustomToast,
  },
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
        password: '',
      },
      // toastMessage: '', // Toast message for success feedback
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/artists/', this.form);
        if (response.status === 201) {
          // this.toastMessage = 'Artist created successfully';
          this.$router.push('/login');
        } else {
          console.error('Error creating artist:', response.data);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    },
  },
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  background-color: #4a5568;
  color: #fff;
  outline: none;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  outline: none;
}

.btn-success {
  background-color: #48bb78;
  color: #fff;
}

.btn-primary {
  background-color: #4299e1;
  color: #fff;
}

.btn:hover {
  filter: brightness(1.2);
}
</style>
