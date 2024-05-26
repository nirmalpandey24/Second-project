<template>
  <div>
    <h1>Manage Artists</h1>
    
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <table v-if="artists.length" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="artist in artists" :key="artist.id">
          <td>{{ artist.id }}</td>
          <td>{{ artist.email }}</td>
          <td>{{ artist.first_name }}</td>
          <td>{{ artist.last_name }}</td>
          <td>{{ artist.date_of_birth }}</td>
          <td>{{ artist.gender }}</td>
          <td>{{ artist.address }}</td>
          <td>{{ artist.country }}</td>
          <td>
            <button @click="openEditModal(artist)" class="edit-user">Edit</button>
            <button @click="deleteArtist(artist.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>


    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2>Edit Artist</h2>
        <form @submit.prevent="updateArtist">
          <div>
            <label for="email">Email:</label>
            <input type="email" v-model="editForm.email" required />
          </div>
          <div>
            <label for="first_name">First Name:</label>
            <input type="text" v-model="editForm.first_name" required />
          </div>
          <div>
            <label for="last_name">Last Name:</label>
            <input type="text" v-model="editForm.last_name" required />
          </div>
          <div>
            <label for="date_of_birth">Date of Birth:</label>
            <input type="date" v-model="editForm.date_of_birth" required />
          </div>
          <div>
            <label for="gender">Gender:</label>
            <select
            v-model="editForm.gender"
            required
          >
            <option value="" disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          </div>
          <div>
            <label for="address">Address:</label>
            <input type="text" v-model="editForm.address" required />
          </div>
          <div>
            <label for="country">Country:</label>
            <input type="text" v-model="editForm.country" required />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageArtists',
  data() {
    return {
      artists: [],
      loading: false,
      error: null,
      showEditModal: false,
      editForm: {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        address: '',
        country: ''
      }
    };
  },
  created() {
    this.fetchArtists();
  },
  methods: {
    async fetchArtists() {
      this.loading = true;
      this.error = null;
      try {
        const token = localStorage.getItem('access_token'); 
        const response = await axios.get('http://127.0.0.1:8000/api/only/artists/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.artists = response.data;
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
    openEditModal(artist) {
      this.editForm = { ...artist };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    async updateArtist() {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.put(`http://127.0.0.1:8000/api/artists/${this.editForm.id}/`, this.editForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedArtist = response.data;
        this.artists = this.artists.map(artist => (artist.id === updatedArtist.id ? updatedArtist : artist));
        this.closeEditModal();
        alert('Artist updated successfully');
      } catch (error) {
        alert('Failed to update artist');
      }
    },
    async deleteArtist(artistId) {
      if (confirm('Are you sure you want to delete this artist?')) {
        try {
          const token = localStorage.getItem('access_token'); 
          await axios.delete(`http://127.0.0.1:8000/api/artists/${artistId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.artists = this.artists.filter(artist => artist.id !== artistId);
          alert('Artist deleted successfully');
        } catch (error) {
          alert('Failed to delete artist');
        }
      }
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
