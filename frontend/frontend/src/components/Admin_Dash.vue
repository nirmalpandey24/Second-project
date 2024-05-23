<template>
    <div>
      <h1>Admin Dashboard</h1>
      <h2>All Artists</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <!-- Add more artist details as needed -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="artist in artists" :key="artist.id">
            <td>{{ artist.email }}</td>
            <td>{{ artist.first_name }}</td>
            <td>{{ artist.last_name }}</td>
            <!-- Add more artist details as needed -->
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        artists: []
      }
    },
    created() {
      this.fetchArtists();
    },
    methods: {
      fetchArtists() {
        axios.get('http://127.0.0.1:8000/api/only/artists/')
          .then(response => {
            this.artists = response.data;
          })
          .catch(error => {
            console.error('Error fetching artists:', error);
          });
      }
    }
  }
  </script>
  