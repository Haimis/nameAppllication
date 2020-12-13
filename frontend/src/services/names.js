import axios from 'axios';

const getAll = () => axios.get('http://localhost:3001/api/names');

export default getAll;
