import axios from 'axios';
const instance = axios.create({
    /*baseURL: 'http://localhost:8080/'*/
    baseURL: 'https://shivaay.azurewebsites.net/'
});
const token = localStorage.getItem('token'); 
if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
}
export default instance;