<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="bg-gray-800 text-white p-4 shadow-md">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Music Dashboard</h1>
      </div>
    </nav>

    <!-- Sidebar & Content -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="bg-gray-900 text-white w-64 p-4 hidden sm:block">
        <nav class="space-y-4">
          <router-link to="/home" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Home</router-link>
          <router-link to="/admin_account" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">My Account</router-link>
          <router-link to="/display_artists" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Artists</router-link>
          <router-link to="/registration" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Add New Artist</router-link>
          <router-link to="/artist" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Add New Song</router-link>
          <router-link to="/" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">LogOut</router-link>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 bg-gray-100" style="background-image: url('src/assets/image.avif'); background-size: cover; background-position: center;">
        <div class="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
          <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
          
          <!-- Bar Chart: Artists and their Posts -->
          <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Artists and Their Posts</h2>
            <div class="chart-container">
              <Bar :data="artistsPostsData" :options="chartOptions" />
            </div>
          </div>

          <!-- Pie Chart: Genre Distribution -->
          <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Genre Distribution</h2>
            <div class="chart-container">
              <Pie :data="genreDistributionData" :options="chartOptions" />
            </div>
          </div>

          <!-- Line Chart: Monthly New Songs -->
          <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Monthly New Songs</h2>
            <div class="chart-container">
              <Line :data="monthlyNewSongsData" :options="chartOptions" />
            </div>
          </div>

          <!-- Top Artists -->
          <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Top Artists</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div v-for="artist in topArtists" :key="artist.id" class="bg-white p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
                <h2 class="text-xl font-bold mb-2">{{ artist.name }}</h2>
                <p class="text-gray-700">Posts: {{ artist.posts }}</p>
              </div>
            </div>
          </div>

          <!-- Songs Grid -->
          <!-- <h1 class="text-3xl font-bold mb-6">My Songs</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="song in songs" :key="song.id" class="bg-white p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
              <h2 class="text-xl font-bold mb-2">{{ song.title }}</h2>
              <p class="text-gray-700">{{ song.artist }}</p>
            </div>
          </div> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { Bar, Pie, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

export default {
  name: 'Dashboard',
  components: {
    Bar,
    Pie,
    Line
  },
  data() {
    return {
      songs: [
        { id: 1, title: 'Song One', artist: 'Artist One' },
        { id: 2, title: 'Song Two', artist: 'Artist Two' },
        { id: 3, title: 'Song Three', artist: 'Artist Three' },
        { id: 4, title: 'Song Four', artist: 'Artist Four' },
        { id: 5, title: 'Song Five', artist: 'Artist Five' }
      ],
      topArtists: [
        { id: 1, name: 'Artist One', posts: 10 },
        { id: 2, name: 'Artist Two', posts: 8 },
        { id: 3, name: 'Artist Three', posts: 15 },
        { id: 4, name: 'Artist Four', posts: 5 },
        { id: 5, name: 'Artist Five', posts: 7 }
      ],
      artistsPostsData: {
        labels: ['Artist One', 'Artist Two', 'Artist Three', 'Artist Four', 'Artist Five'],
        datasets: [
          {
            label: 'Number of Posts',
            data: [10, 8, 15, 5, 7], // Example data
            backgroundColor: ['#4a90e2', '#50e3c2', '#f5a623', '#e94e77', '#7ed321'],
          },
        ],
      },
      genreDistributionData: {
        labels: ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip Hop'],
        datasets: [
          {
            label: 'Genre Distribution',
            data: [12, 19, 3, 5, 2], // Example data
            backgroundColor: ['#4a90e2', '#50e3c2', '#f5a623', '#e94e77', '#7ed321'],
          },
        ],
      },
      monthlyNewSongsData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Monthly New Songs',
            data: [5, 10, 15, 20, 25, 30], // Example data
            borderColor: '#4a90e2',
            backgroundColor: 'rgba(74, 144, 226, 0.2)',
            fill: true,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar */
body::-webkit-scrollbar {
  width: 12px;
}

body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

body::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.chart-container {
  position: relative;
  margin: auto;
  height: 400px;
  width: 100%;
}
</style>
