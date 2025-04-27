import axios from "axios";
import Cookies from "js-cookie";

export const $api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + Cookies.get('token'),
  },
})

export const getStatistics = async (from: string, to: string) => {
  return $api.request({
    url: `statistic`,
    method: "get",
    params: {
      from,
      to
    }
  })
  .then((response) => response.data)
  .catch((error) => error)
}

export const getRecommendations = async () => {
  return $api.request({
    url: `recommendations`,
    method: "get",
  })
  .then((response) => response.data)
  .catch((error) => error)
}