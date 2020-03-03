import Home from '../views/Home'
import About from '../views/About'
import Mitra from '../views/Mitra'
import MitraDetail from '../views/MitraDetail'
import MitraOrder from '../views/MitraOrder'

const guest = [
    {
        path: '',
        name: 'home',
        component: Home
    },
    {
        path: 'about-us',
        name: 'about',
        component: About
    },
    {
        path: 'pesan',
        name: 'pesan',
        component: Order,

    },
    {
        path: 'mitra',
        name: 'mitra',
        component: Mitra,
    },
    {
        path: 'mitra/:data',
        name: 'mitra-det',
        component: MitraDetail
    },
    {
        path: 'mitra/:data/pesan',
        name: 'mitra-order',
        component: MitraOrder
    },


]
export default guest