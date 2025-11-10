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
};