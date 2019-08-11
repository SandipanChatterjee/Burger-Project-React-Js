import axios from 'axios'
const instance  = axios.create({
    baseURL :'https://udemy-react-burgerproject.firebaseio.com/'
})

export default instance