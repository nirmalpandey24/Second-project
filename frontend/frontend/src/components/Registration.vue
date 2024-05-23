<template>
  <div class="bg-green-200 min-h-screen flex justify-center items-center" style="background-image: url('src/assets/image.avif'); background-size: cover">
    <div class="max-w-xl w-full bg-gray-500 rounded-lg p-8 opacity-90">
      <form @submit.prevent="submitForm" class="space-y-4 opacity-70">
        <div>
          <label for="email" class="text-white block">Email:</label>
          <input type="email" id="email" v-model="form.email" required class="input-field">
        </div>
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <label for="phone" class="text-white block">Phone:</label>
            <input type="tel" id="phone" v-model="form.phone" required class="input-field">
          </div>
          <div class="w-full md:w-1/2 px-2">
            <label for="first_name" class="text-white block">First Name:</label>
            <input type="text" id="first_name" v-model="form.first_name" required class="input-field">
          </div>
        </div>
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <label for="last_name" class="text-white block">Last Name:</label>
            <input type="text" id="last_name" v-model="form.last_name" required class="input-field">
          </div>
          <div class="w-full md:w-1/2 px-2">
            <label for="dob" class="text-white block">Date of Birth:</label>
            <input type="date" id="dob" v-model="form.dob" class="input-field">
          </div>
        </div>
        <div>
          <label for="address" class="text-white block">Address:</label>
          <input type="text" id="address" v-model="form.address" class="input-field">
        </div>
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <label for="city" class="text-white block">City:</label>
            <input type="text" id="city" v-model="form.city" class="input-field">
          </div>
          <div class="w-full md:w-1/2 px-2">
            <label for="country" class="text-white block">Country:</label>
            <input type="text" id="country" v-model="form.country" class="input-field">
          </div>
        </div>
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <label for="gender" class="text-white block">Gender:</label>
            <select id="gender" v-model="form.gender" required class="input-field">
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label for="password" class="text-white block">Password:</label>
          <input type="password" id="password" v-model="form.password" required class="input-field">
        </div>
        <button class="btn btn-success" @click="getCookie">Add User</button>
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
        phone: '',
        first_name: '',
        last_name: '',
        dob: '',
        gender: '',
        address: '',
        city: '',
        country: '',
        password: '',
      },
      csrfToken: null, // Add a variable to store the CSRF token
    };
  },
  methods: {
    submitForm() {
      axios.post('http://127.0.0.1:8000/api/create-artists/', this.form, {
        headers: {
          'X-CSRFToken': this.csrfToken // Use the stored CSRF token
        }
      })
      .then(response => {
        this.form = {
          email: '',
          phone: '',
          first_name: '',
          last_name: '',
          dob: '',
          gender: '',
          address: '',
          city: '',
          country: '',
          password: ''
        };
        console.log('User added successfully');
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
    },
    getCSRFToken() {
      axios.get('http://127.0.0.1:8000/api/get-csrf-token')
        .then(response => {
          this.csrfToken = response.data.csrftoken;
          console.log(this.csrfToken) // Save the CSRF token
        })
        .catch(error => {
          console.error('Error getting CSRF token:', error);
        });
    }
  },
  mounted() {
    this.getCSRFToken(); 
  }
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
