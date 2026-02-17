
const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`, 
  withCredentials: true,
});

api.get('/incidents')