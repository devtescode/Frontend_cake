const isProduction = window.location.hostname !== 'localhost';

export const baseURL = isProduction 
  ? ''   
  : 'http://localhost:4500';  


  