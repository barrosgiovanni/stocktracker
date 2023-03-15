import axios from "axios";

const apiKey = 'cg8b5m9r01qgf5t8tkvgcg8b5m9r01qgf5t8tl00';

export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: apiKey
  }
})
