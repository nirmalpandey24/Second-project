import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import LoginForm from './components/Login.vue'
import SignUp from './components/SignUp.vue'
import AdminDash from './components/Admin_Dash.vue'
import ArtistDash from './components/Artist_Dash.vue'
import router from './router'
const app = createApp(App)
app.use(router)
app.component(LoginForm)
app.component(SignUp)
app.component(AdminDash)
app.component(ArtistDash)
app.mount('#app')
