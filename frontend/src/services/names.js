import axios from 'axios'

const getAll = () => {
    return axios.get('/api/names')
}

export default { getAll }