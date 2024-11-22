import * as React from 'react'
import BusForm from '@/components/BusForm'
import { getBus } from '@/service/bus'

type Props = {
    params: {
        id: string
    }
}

const Update = async ({ params }: Props) => {
    const bus: any = await getBus(params.id)

    return (
        <div className='w-full h-full space-y-4 mb-10'>
            <h1 className='font-bold text-3xl'>Update Bus</h1>
            <BusForm update={bus} />
        </div>
    )
}

export default Update