import axios from 'axios';

const baseURL = 'https://billsplitapi.herokuapp.com';

export default axios.create({
  baseURL,
});
