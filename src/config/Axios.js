import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'https://knowledgeacademy-back.herokuapp.com/api'
})

export default clientAxios;