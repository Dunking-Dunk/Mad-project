import './announcement.scss'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getAllAnnouncement, deleteAnnouncement } from '../../store/actions/action'
import moment from 'moment'

const Announcement = () => {
    const announcements = useSelector((state)=> state.announcements.announcements)
    const dispatch = useDispatch()
    
    useEffect(() => {
       dispatch(getAllAnnouncement())
    }, [])

    const handleDelete = (id) => {
    
        dispatch(deleteAnnouncement(id))
    }

    return (
 
        <div className="announcement__container">
            <h1 className='announcement__title'>Announcement</h1>
            <div className='announcement__create__container'>
                <h3>Create Announcement</h3>
                <Link className='announcement__create__container-btn' to='/announcement/new'>Add announcement</Link>
            </div>
            <div className='announcement__content__container'>
                {announcements && announcements.map((announcement, index) => {
                    return (
                        <div className='announcement__content__announcement' key={index}>
                            <div dangerouslySetInnerHTML={{ __html: announcement.content }} /> 
                            <div>
                                <h3 >{moment(announcement.createdAt).fromNow()}</h3>
                                <button className='deleteButton' onClick={() => handleDelete(announcement.id)}>Delete</button>
                            </div>
                           
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default Announcement