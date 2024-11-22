"use client"
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import api from '@/api/axios'

const Logout = () => {
    const router = useRouter()

    return <Button variant='ghost'onClick={async() => {
        await api.post('/users/signout')
        router.refresh()
        router.push('/')
    }}>Logout</Button>
}

export default Logout