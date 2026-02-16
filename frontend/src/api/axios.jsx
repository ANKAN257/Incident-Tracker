
const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  withCredentials: true,
});

api.get('/incidents')