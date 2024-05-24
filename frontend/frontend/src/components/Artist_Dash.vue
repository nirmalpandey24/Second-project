<template>
<div class="min-h-screen bg-gray-100 bg-opacity-20" style="background-image: url('src/assets/background.jpg')">

    <!-- Navbar -->
    <nav class="bg-black  text-white p-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Music Dashboard</h1>
        <div>
          <button @click="showAddNewSong" class="px-4 py-2 rounded-md bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800">Add New Song</button>
          <button @click="showMySongs" class="px-4 py-2 ml-4 rounded-md bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800">My Songs</button>
        </div>
      </div>
    </nav>
    
    <div class="max-w-4xl mx-auto p-6 mt-8 bg-gray-800  rounded-lg shadow-md marker:">
      <h1 class=" font-bold text-center mb-8 text-white text-4xl">Add New Song</h1>
      
      
      <form @submit.prevent="createSong" class="space-y-4 ">
        <div>
          <label for="title" class="block font-bold text-white text-2xl">Title</label>
          <input type="text" v-model="newSong.title" required
                 class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                 placeholder="Enter title">
        </div>
        <div>
          <label for="release_date" class="block font-bold  text-white text-2xl">Release Date</label>
          <input type="date" v-model="newSong.release_date" required
                 class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div>
          <label for="duration" class="block font-bold  text-white text-2xl">Duration</label>
          <input type="number" v-model="newSong.duration" required
                 class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                 placeholder="Enter duration">
        </div>
        <div>
          <label for="lyrics" class="block font-bold  text-white text-2xl">Lyrics</label>
          <textarea v-model="newSong.lyrics"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter lyrics"></textarea>
        </div>
        <div>
          <label for="language" class="block font-bold  text-white text-2xl">Language</label>
          <input type="text" v-model="newSong.language" required
                 class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                 placeholder="Enter language">
        </div>
        <button type="submit" class="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Create Song
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newSong: {
        title: '',
        release_date: '',
        duration: '',
        lyrics: '',
        language: ''
      }
    };
  },
  methods: {
    createSong() {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('access_token');
      this.newSong.artist = user.id; 

      axios
        .post('http://127.0.0.1:8000/api/song/create/', this.newSong, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.newSong = {
            title: '',
            release_date: '',
            duration: '',
            lyrics: '',
            language: ''
          };
          alert('Song created successfully!');
        })
        .catch(error => {
          console.error('Error creating song:', error);
          alert('Failed to create song. Please try again.');
        });
    },
    showMySongs() {
      this.$router.push({ name: 'ArtistSongs' });
    },
    showAddNewSong() {
      
    }
  }
};
</script>

<style scoped>

</style>
