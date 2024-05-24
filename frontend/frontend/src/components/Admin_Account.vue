<template>
  <div class="max-w-md mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4 text-center">My Account</h1>
    <div v-if="loading" class="text-center text-lg text-blue-600">Loading...</div>
    <div v-if="error" class="text-center text-lg text-red-600">{{ error }}</div>
    <div v-if="artist" class="bg-white shadow-md rounded-md p-6">
      <p class="text-lg"><span class="font-semibold">Email:</span> {{ artist.email }}</p>
      <p class="text-lg"><span class="font-semibold">Created At:</span> {{ artist.created_at }}</p>
      <p class="text-lg"><span class="font-semibold">Updated At:</span> {{ artist.updated_at }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminAccount',
  data() {
    return {
      artist: null,
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchArtistData();
  },
  methods: {
    async fetchArtistData() {
      this.loading = true;
      this.error = null;
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:8000/api/only/admin/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.artist = response.data;
      } catch (error) {
        this.error = 'Failed to load artist data';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>

</style>
