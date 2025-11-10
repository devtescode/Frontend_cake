const isProduction = window.location.hostname !== 'localhost';

export const baseURL = isProduction 
  ? 'https://backend-cake-e3j6.onrender.com'   
  : 'http://localhost:4500';  


  