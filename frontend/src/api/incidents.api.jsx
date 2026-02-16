
import api from './axios';

export const getIncidents = (params) =>
  api.get('/incidents', { params });

