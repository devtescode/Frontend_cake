import { baseURL } from '../config';


export const API_URLS = {
    userlogin: `${baseURL}/usercake/login`,
    register: `${baseURL}/usercake/register`,
    logout: `${baseURL}/usercake/logout`,
    admingetplan: `${baseURL}/admin/admingetplan`,
    getsingleplan: (id) => `${baseURL}/admin/getsingleplan/${id}`,
    useraddorder: `${baseURL}/usercake/useraddorder`,
    getuserorders: (userId) => `${baseURL}/usercake/getuserorders/${userId}`,
    updatequantity: (orderId) => `${baseURL}/usercake/updatequantity/${orderId}`,
    userdeleteorder: (orderId) => `${baseURL}/usercake/userdeleteorder/${orderId}`,
    check: `${baseURL}/admin/check`,
    create: `${baseURL}/admin/create`,
    adminlogin: `${baseURL}/admin/login`,
    getdashboardstatus: `${baseURL}/admin/getdashboardstatus`,
    admingetplan: `${baseURL}/admin/admingetplan`,
    admindelete: (id) => `${baseURL}/admin/admindelete/${id}`,
    adminupdate: (id) => `${baseURL}/admin/adminupdate/${id}`,
    admincreateplan: `${baseURL}/admin/admincreateplan`,
    admingetallusers: `${baseURL}/admin/admingetallusers`,
    getallorders: `${baseURL}/usercake/getallorders`,
    delivered: (orderId) => `${baseURL}/admin/orders/${orderId}/delivered`,  
    deliveredgroup: `${baseURL}/admin/deliveredgroup`,
    settledorders: `${baseURL}/admin/settledorders`,
    getUserDashboard: (userId) => `${baseURL}/usercake/getUserDashboard/${userId}`,
    payments: `${baseURL}/payments/initialize`,
    userprofileupdate: (userId) => `${baseURL}/usercake/userprofileupdate/${userId}`,
    updateprofile: (userId) => `${baseURL}/usercake/updateprofile/${userId}`,
    getusernotifications: (userId) => `${baseURL}/admin/getusernotifications/${userId}`,
     markAsRead: (notificationId) => `${baseURL}/admin/markasread/${notificationId}`,
    // http://localhost:4500/admin/markasread
    
};