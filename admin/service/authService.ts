import axios from '@/api/axios'
import { cookies } from 'next/headers'

export const authenticate = async (email: string, password: String) => {
        const res = await axios.post('/api/users/signin', { email, password })
        const resData = await res.data
        return resData
}
export const getUser = async () => {
        const token = cookies().get('token')

        const res = await fetch('http://localhost:4000/api/users/currentuser', {
                headers: {
                        Cookie: `token=${token?.value}`
                },
                cache: 'no-cache'
        
        })
        const resData = await res.json()
        return resData
}