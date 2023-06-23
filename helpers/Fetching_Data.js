const axios = require('axios')
const URL = 'https://mindicador.cl/api'

const Fetch_Data = async () => {
  try {
    const response = await axios.get(URL)
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

module.exports = Fetch_Data
