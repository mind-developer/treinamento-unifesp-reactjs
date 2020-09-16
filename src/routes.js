import UsuariosPage from './pages/Usuarios'
import HomePage from './pages/Home'

export const routes = [
  {
    path: '/',
    title: 'Home',
    exact: true,
    component: HomePage
  },
  {
    path: '/usuarios',
    title: 'Usuários',
    exact: true,
    component: UsuariosPage
  }
]