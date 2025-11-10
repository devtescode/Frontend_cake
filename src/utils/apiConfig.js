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
};