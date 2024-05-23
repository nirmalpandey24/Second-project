import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../components/SignUp.vue';
import LoginForm from '../components/Login.vue'
import AdminDash from '../components/Admin_Dash.vue';
import ArtistDash from '../components/Artist_Dash.vue';
import ArtistSongs from '../components/ArtistSongs.vue';
const routes= [
    {
      path:'/signup',
      name:'SignUp',
      component:SignUp
    },
    {
      path:'/login',
      name:'LoginForm',
      component:LoginForm
    },
    {
      path:'/admin',
      name:'AdminDash',
      component:AdminDash
    },
    {
      path:'/artist',
      name:'ArtistDash',
      component:ArtistDash
    },
    {
      path:'/ArtistSongs',
      name:'ArtistSongs',
      component:ArtistSongs
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
export default router