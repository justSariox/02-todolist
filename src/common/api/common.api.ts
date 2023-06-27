import axios from 'axios'


const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '4ae79221-a547-42ce-bc89-4afae61dc986'
    }
}
export const instance = axios.create({

    ...settings
})