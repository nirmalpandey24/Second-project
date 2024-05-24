import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../components/SignUp.vue';
import LoginForm from '../components/Login.vue'
import AdminDash from '../components/Admin_Dash.vue';
import ArtistDash from '../components/Artist_Dash.vue';
import ArtistSongs from '../components/ArtistSongs.vue';
import DisplayArtist from '../components/Display_artist.vue';
import AdminAccount from '@/components/Admin_Account.vue';
import Registration from '../components/Registration.vue';
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
    },
    {
      path:'/display_artists',
      name:'DisplayArtist',
      component:DisplayArtist

    },
    {
      path:'/admin_account',
      name:'AdminAccount',
      component:AdminAccount
    },
    {
      path:'/Registration ',
      name:'Registration',
      component:'Registration '
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
export default router