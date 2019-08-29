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

import Order from '../views/admin/Order' 
import OrderList from '../views/admin/OrderList' 
import OrderEdit from '../views/admin/OrderEdit'

import IncomeExpense from '../views/admin/IncomeExpense'

import Report from '../views/admin/Report'
import ReportOrderDetail from '../views/admin/ReportOrderDetail'

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
    // ORDER ---------------------------------------------
    {
        path: 'pesanan',
        component: Order,
        children: [
            {
                path: '',
                name: 'order-list',
                component: OrderList,
            },
            {
                path: 'detail/:data',
                name: 'order-edit',
                component: OrderEdit,
            }
        ]

    },

    // EXPENSE INCOME ----------------------------------------
    {
        path:'pemasukan_pengeluaran',
        name: 'income-expense',
        component: IncomeExpense,

    },

    // REPORT ----------------------------------------
    {
        path: 'laporan',
        name: 'report',
        component: Report
    },
    {
        path: 'laporan/pesanan/:data',
        name: 'report-order-detail',
        component: ReportOrderDetail
    },

    // LABOR ----------------------------------------------
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