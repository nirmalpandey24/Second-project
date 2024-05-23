<template>
    <div class="artist-page">
      <h1>I am an artist</h1>
      
      <!-- Form to create a new song -->
      <form @submit.prevent="createSong">
        <div>
          <label for="title">Title</label>
          <input type="text" v-model="newSong.title" required>
        </div>
        <div>
          <label for="release_date">Release Date</label>
          <input type="date" v-model="newSong.release_date" required>
        </div>
        <div>
          <label for="duration">Duration</label>
          <input type="text" v-model="newSong.duration" required>
        </div>
        <div>
          <label for="lyrics">Lyrics</label>
          <textarea v-model="newSong.lyrics"></textarea>
        </div>
        <div>
          <label for="language">Language</label>
          <input type="text" v-model="newSong.language" required>
        </div>
        <button type="submit">Create Song</button>
      </form>
  
      <button @click="showMySongs">Show My Songs</button>
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
        this.newSong.artist = user.id; // Ensure the artist ID is set
  
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
      }
    }
  };
  </script>
  
  <style scoped>
  .artist-page {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .artist-page h1,
  .artist-page h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .artist-page form {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
  }
  
  .artist-page form div {
    margin-bottom: 15px;
  }
  
  .artist-page form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .artist-page form input,
  .artist-page form textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .artist-page form button {
    align-self: flex-start;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .artist-page form button:hover {
    background-color: #45a049;
  }
  
  .artist-page button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .artist-page button:hover {
    background-color: #0b7dda;
  }
  </style>
  