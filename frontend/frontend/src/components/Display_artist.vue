<template>
    <div class="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 class="text-4xl font-bold text-center mb-10">Artists and Their Songs</h1>
      <div v-if="loading" class="text-center text-lg text-blue-600">Loading...</div>
      <div v-if="error" class="text-center text-lg text-red-600">{{ error }}</div>
      <div v-if="artists.length" class="space-y-8">
        <div v-for="artist in artists" :key="artist.id" class="artist bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">{{ artist.first_name }} {{ artist.last_name }}</h2>
          <button @click="showEditArtistModal(artist)" class="text-sm text-blue-500">Edit Artist</button>
          <button @click="deleteArtist(artist.id)" class="text-sm text-red-500 ml-2">Delete Artist</button>
          <ul class="list-disc list-inside">
            <li v-for="song in artist.songs" :key="song.id" class="text-lg">
              {{ song.title }}
              <button @click="showEditSongModal(artist, song)" class="text-sm text-blue-500 ml-2">Edit</button>
              <button @click="deleteSong(artist.id, song.id)" class="text-sm text-red-500 ml-2">Delete</button>
            </li>
          </ul>
          <div class="mt-4">
            <input v-model="newSongTitle" placeholder="New Song Title" class="border rounded p-2">
            <button @click="addSong(artist.id)" class="bg-blue-500 text-white p-2 rounded">Add Song</button>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <h2 class="text-2xl font-bold mb-4">Add New Artist</h2>
        <input v-model="newArtistFirstName" placeholder="First Name" class="border rounded p-2 mb-2">
        <input v-model="newArtistLastName" placeholder="Last Name" class="border rounded p-2 mb-2">
        <button @click="addArtist" class="bg-blue-500 text-white p-2 rounded">Add Artist</button>
      </div>
  
      <!-- Edit Artist Modal -->
      <div v-if="showArtistModal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-2xl font-semibold mb-4">Edit Artist</h2>
          <input v-model="editArtistFirstName" placeholder="First Name" class="border rounded p-2 mb-2 w-full">
          <input v-model="editArtistLastName" placeholder="Last Name" class="border rounded p-2 mb-2 w-full">
          <div class="flex justify-end">
            <button @click="updateArtist" class="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
            <button @click="closeArtistModal" class="bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </div>
      </div>
  
      <!-- Edit Song Modal -->
      <div v-if="showSongModal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-2xl font-semibold mb-4">Edit Song</h2>
          <input v-model="editSongTitle" placeholder="Song Title" class="border rounded p-2 mb-2 w-full">
          <div class="flex justify-end">
            <button @click="updateSong" class="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
            <button @click="closeSongModal" class="bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AdminArtistPanel',
    data() {
      return {
        artists: [],
        loading: false,
        error: null,
        newArtistFirstName: '',
        newArtistLastName: '',
        newSongTitle: '',
        showArtistModal: false,
        showSongModal: false,
        editArtistFirstName: '',
        editArtistLastName: '',
        editSongTitle: '',
        editArtist: null,
        editSong: null,
        editArtistId: null,
        editSongId: null,
      };
    },
    created() {
      this.fetchArtistsAndSongs();
    },
    methods: {
      async fetchArtistsAndSongs() {
        this.loading = true;
        this.error = null;
        try {
          const token = localStorage.getItem('access_token');
          const artistsResponse = await axios.get('http://127.0.0.1:8000/api/only/admin/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const artists = artistsResponse.data;
  
          // Fetch songs for each artist
          const artistPromises = artists.map(async (artist) => {
            const songsResponse = await axios.get(`http://127.0.0.1:8000/api/songs/user/${artist.id}/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            artist.songs = songsResponse.data;
            return artist;
          });
  
          this.artists = await Promise.all(artistPromises);
        } catch (error) {
          if (error.response && error.response.status === 403) {
            this.error = 'You do not have permission to view this data.';
          } else {
            this.error = 'Failed to load artist data';
          }
        } finally {
          this.loading = false;
        }
      },
      async addArtist() {
        const token = localStorage.getItem('access_token');
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/only/artists/', {
            first_name: this.newArtistFirstName,
            last_name: this.newArtistLastName,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.artists.push(response.data);
          this.newArtistFirstName = '';
          this.newArtistLastName = '';
        } catch (error) {
          console.error('Failed to add artist:', error);
        }
      },
      showEditArtistModal(artist) {
        this.editArtist = artist;
        this.editArtistFirstName = artist.first_name;
        this.editArtistLastName = artist.last_name;
        this.editArtistId = artist.id;
        this.showArtistModal = true;
      },
      async updateArtist() {
        const token = localStorage.getItem('access_token');
        try {
          const response = await axios.put(`http://127.0.0.1:8000/api/individual/${this.editArtistId}/`, {
            first_name: this.editArtistFirstName,
            last_name: this.editArtistLastName,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.editArtist.first_name = response.data.first_name;
          this.editArtist.last_name = response.data.last_name;
          this.showArtistModal = false;
        } catch (error) {
          console.error('Failed to update artist:', error);
        }
      },
      closeArtistModal() {
        this.showArtistModal = false;
      },
      async deleteArtist(artistId) {
        const token = localStorage.getItem('access_token');
        try {
          await axios.delete(`http://127.0.0.1:8000/api/individual/${artistId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.artists = this.artists.filter(artist => artist.id !== artistId);
        } catch (error) {
          console.error('Failed to delete artist:', error);
        }
      },
      async addSong(artistId) {
        const token = localStorage.getItem('access_token');
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/songs/', {
            user: artistId,
            title: this.newSongTitle,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const artist = this.artists.find(artist => artist.id === artistId);
          artist.songs.push(response.data);
          this.newSongTitle = '';
        } catch (error) {
          console.error('Failed to add song:', error);
        }
      },
      showEditSongModal(artist, song) {
        this.editArtist = artist;
        this.editSong = song;
        this.editSongTitle = song.title;
        this.editSongId = song.id;
        this.showSongModal = true;
      },
      async updateSong() {
        const token = localStorage.getItem('access_token');
        try {
          const response = await axios.patch(`http://127.0.0.1:8000/api/song/${this.editSongId}/`, {
            title: this.editSongTitle,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.editSong.title = response.data.title;
          this.showSongModal = false;
        } catch (error) {
          console.error('Failed to update song:', error);
        }
      },
      closeSongModal() {
        this.showSongModal = false;
      },
      async deleteSong(artistId, songId) {
        const token = localStorage.getItem('access_token');
        try {
          await axios.delete(`http://127.0.0.1:8000/api/songs/${songId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const artist = this.artists.find(artist => artist.id === artistId);
          artist.songs = artist.songs.filter(song => song.id !== songId);
        } catch (error) {
          console.error('Failed to delete song:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  
  .artist {
    border-left: 4px solid #4a5568;
    padding-left: 1rem;
  }
  
  .artist h2 {
    color: #2d3748;
  }
  
  .artist ul {
    list-style-type: none;
    padding: 0;
  }
  
  .artist ul li {
    margin: 5px 0;
    color: #4a5568;
  }
  
  .fixed {
    position: fixed;
  }
  
  .inset-0 {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  </style>
  