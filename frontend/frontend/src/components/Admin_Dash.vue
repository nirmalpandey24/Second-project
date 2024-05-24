<template>
  <div class="min-h-screen flex flex-col" >
    <!-- Navbar -->
    <nav class="bg-gray-800 text-white p-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Music Dashboard</h1>
        <div class="hidden sm:block">
          <router-link to="/home" class="px-4 py-2 text-xl font-bold">Home</router-link>
          <router-link to="/admin_account" class="px-4 py-2 text-xl font-bold">My Account</router-link>
          <router-link to="/display_artists" class="px-4 py-2 text-xl font-bold">Artists</router-link>
          <router-link to="/registration" class="px-4 py-2 text-xl font-bold">Add new Artist</router-link>
          <router-link to="/artist" class="px-4 py-2 text-xl font-bold">Add new Song</router-link>
          <router-link to="/" class="px-4 py-2 text-xl font-bold">LogOut</router-link>
        </div>
      </div>
    </nav>

    
    <div class="flex-grow p-6 bg-blue-100 " style="background-image: url('src/assets/image.avif')">
      <h1 class="text-3xl font-bold mb-6">My Songs</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="song in songs" :key="song.id" class="bg-white p-4 rounded shadow">
          <h2 class="text-xl font-bold mb-2">{{ song.title }}</h2>
          <p class="text-gray-700">{{ song.artist }}</p>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [
     
      ]
    };
  }
};
</script>

<style scoped>

</style>
