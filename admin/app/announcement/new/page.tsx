"use client"

import React, { useState } from 'react'
import Loader from '@/components/Loader'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useToast } from '@/components/ui/use-toast'
import TextEditor from '@/components/TextEditor'
import { Button } from '@/components/ui/button'
import { createAnnouncement } from '@/store/announcementReducer'

const New = () => {
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const [content, setContent] = useState('')

    const submitHandler = () => {
        if (content.length > 4) {
            dispatch(createAnnouncement({ content: content })).then((state: any) => {
                if (!state.error) {
                    toast({
                        title: "Successfully Created",
                        description: "Created a new Announcement",
                        variant: 'default'
                    })
                }
                setContent('')
            })

        }

    }

    return (
        <div className='flex flex-col space-y-4'>
            <h1 className='font-bold text-2xl'>Create Announcement</h1>
            <TextEditor setContent={setContent} content={content} />
            <Button onClick={submitHandler} content={content}>Create Announcement</Button>
        </div>
    )
}

export default New