import Axios from 'axios'

let http = Axios.create({
    timeout: 3000,
    responseType: 'json',
    responseEncoding: 'utf8',
});

export default http;