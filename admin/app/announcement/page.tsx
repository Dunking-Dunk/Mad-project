'use client'

import { useAppDispatch, useAppSelector } from '@/store/store'
import * as React from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { deleteAnnouncement } from '@/store/announcementReducer'

const Announcement = () => {
    const { announcements } = useAppSelector((state) => state.Announcement)
    const dispatch = useAppDispatch()

    const onDelete = (id: string) => {
        dispatch(deleteAnnouncement(id))
    }


    return (
        <div className='w-full h-full'>
            <div className='flex flex-col space-y-4'>


                {announcements.map((announcement) => {
                    return (
                        <Card className='p-4 space-y-4'>
                            <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
                            <div className='flex flex-row justify-between'>
                                <h3 >{moment(announcement.createdAt).fromNow()}</h3>
                                <Button variant='destructive' onClick={() => onDelete(announcement.id)}>Delete</Button>
                            </div>

                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default Announcement