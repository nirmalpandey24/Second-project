<template>
    <div class="min-h-screen flex flex-col">
      <!-- Navbar -->
      <nav class="bg-gray-800 text-white p-4 shadow-md">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-semibold">Artist Dashboard</h1>
        </div>
      </nav>
  
      <!-- Sidebar & Content -->
      <div class="flex flex-1">
        <!-- Sidebar -->
        <aside class="bg-gray-900 text-white w-64 p-4 hidden sm:block">
          <nav class="space-y-4">
            <router-link to="/home" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Home</router-link>
            <router-link to="/profile" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Profile</router-link>
            <router-link to="/my_songs" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">My Songs</router-link>
            <router-link to="/upload_song" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Upload Song</router-link>
            <router-link to="/" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Logout</router-link>
          </nav>
        </aside>
  
        <!-- Main Content -->
        <main class="flex-1 p-6 bg-gray-100" style="background-image: url('src/assets/image.avif'); background-size: cover; background-position: center;">
          <div class="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold mb-6">Artist Dashboard</h1>
            
            <!-- Bar Chart: Song Performance -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold mb-4">Song Performance</h2>
              <div class="chart-container">
                <Bar :data="songPerformanceData" :options="chartOptions" />
              </div>
            </div>
  
            <!-- Pie Chart: Genre Distribution -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold mb-4">Genre Distribution</h2>
              <div class="chart-container">
                <Pie :data="genreDistributionData" :options="chartOptions" />
              </div>
            </div>
  
            <!-- Line Chart: Monthly Song Uploads -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold mb-4">Monthly Song Uploads</h2>
              <div class="chart-container">
                <Line :data="monthlyUploadsData" :options="chartOptions" />
              </div>
            </div>
  
            <!-- Top Songs -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold mb-4">Top Songs</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="song in topSongs" :key="song.id" class="bg-white p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
                  <h2 class="text-xl font-bold mb-2">{{ song.title }}</h2>
                  <p class="text-gray-700">Plays: {{ song.plays }}</p>
                </div>
              </div>
            </div>
  
            <!-- Songs Grid -->
            <h1 class="text-3xl font-bold mb-6">My Songs</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div v-for="song in mySongs" :key="song.id" class="bg-white p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
                <h2 class="text-xl font-bold mb-2">{{ song.title }}</h2>
                <p class="text-gray-700">{{ song.artist }}</p>
              </div>
            </div>
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
    name: 'ArtistDashboard',
    components: {
      Bar,
      Pie,
      Line
    },
    data() {
      return {
        mySongs: [
          { id: 1, title: 'Song One', artist: 'Artist One' },
          { id: 2, title: 'Song Two', artist: 'Artist One' },
          { id: 3, title: 'Song Three', artist: 'Artist One' },
          { id: 4, title: 'Song Four', artist: 'Artist One' },
          { id: 5, title: 'Song Five', artist: 'Artist One' }
        ],
        topSongs: [
          { id: 1, title: 'Song One', plays: 1500 },
          { id: 2, title: 'Song Two', plays: 1200 },
          { id: 3, title: 'Song Three', plays: 1100 },
          { id: 4, title: 'Song Four', plays: 900 },
          { id: 5, title: 'Song Five', plays: 700 }
        ],
        songPerformanceData: {
          labels: ['Song One', 'Song Two', 'Song Three', 'Song Four', 'Song Five'],
          datasets: [
            {
              label: 'Number of Plays',
              data: [1500, 1200, 1100, 900, 700], // Example data
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
        monthlyUploadsData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Monthly Song Uploads',
              data: [1, 2, 3, 4, 5, 6], // Example data
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
  