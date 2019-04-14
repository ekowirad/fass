import Dashboard from '../views/admin/Dashboard'
import Member from '../views/admin/Member'
import Profile from '../views/admin/Profile'


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
        component: Profile

    }
]

export default admin 