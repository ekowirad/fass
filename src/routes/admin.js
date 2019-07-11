import Dashboard from '../views/admin/Dashboard'
import Admin from '../views/admin/Admin'
import AdminList from '../views/admin/AdminList'
import AdminProfile from '../views/admin/AdminProfile'
import AdminPost from '../views/admin/AdminPost'
import LaborPrt from '../views/admin/LaborPrt'
import LaborBabysitter from '../views/admin/LaborBabysitter'
import LaborList from '../views/admin/LaborList'
import LaborCaregiver from '../views/admin/LaborCaregiver'
import LaborPost from '../views/admin/LaborPost'
import LaborEdit from '../views/admin/LaborEdit'

const admin = [
    {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: 'admins',
        component: Admin,
        children: [
            {
                path: 'profile/:data',
                name: 'admin-profile',
                component: AdminProfile,
            },
            {
                path: 'post',
                name: 'admin-post',
                component: AdminPost,
            },
            {
                path: '',
                name: 'admin-list',
                component: AdminList,

            }
        ]
    },
    {
        path: 'pekerja/post',
        name: 'labor-post',
        component: LaborPost,
    },
    {
        path: 'prt',
        component: LaborPrt,
        children: [
            {
                path: '',
                name: 'prt-list',
                component: LaborList,
            },
            {
                path: ':data',
                name: 'prt-edit',
                component: LaborEdit,
            },
        ],

    },
    {
        path: 'pengasuh_bayi',
        component: LaborBabysitter,
        children: [
            {
                path: '',
                name: 'babysitter-list',
                component: LaborList,

            },
            {
                path: ':data',
                name: 'babysitter-edit',
                component: LaborEdit,
            },

        ]
    },
    {
        path: 'pengasuh_lansia',
        component: LaborCaregiver,
        children: [
            {
                path: '',
                name: 'caregiver-list',
                component: LaborList,
            },
            {
                path: ':data',
                name: 'caregiver-edit',
                component: LaborEdit,
            },
        ],

    },
]

export default admin 