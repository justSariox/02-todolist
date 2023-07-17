import axios from 'axios'


const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b0a54682-92c3-461b-9281-1680db9b53d0'
    }
}
export const instance = axios.create({

    ...settings
})