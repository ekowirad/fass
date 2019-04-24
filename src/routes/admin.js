import Dashboard from '../views/admin/Dashboard'
import Member from '../views/admin/Member'
import Profile from '../views/admin/Profile'
import Prt from '../views/admin/Prt'


const admin = [
    {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: 'member',
        name: 'member',
        component: Member
    },
    {
        path: 'profile',
        name: 'profile',
        component: Profile,
    },
    {
        path: 'prt',
        name: 'prt',
        component: Prt

    }
]

export default admin 