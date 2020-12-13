import axios from 'axios';

const getAll = () => axios.get('/api/names');

export default getAll;
