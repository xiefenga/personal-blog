import { login as axios } from './instances'

export const login = async info => axios.post('/login', info);


export const whoAmI = async () => axios.get('/whoami');


export const logout = async () => axios.get('/logout');



