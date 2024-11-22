"use client"

import React, { useEffect } from "react"
import { useAppDispatch } from "@/store/store"
import { setBuses } from "@/store/busReducer"
import { setStops } from "@/store/stopReducer"
import { setTrackers } from "@/store/trackerReducer"
import { setDrivers } from "@/store/driverReducer"
import { setAnnouncements } from "@/store/announcementReducer"

import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale,
    PointElement, LineElement, CategoryScale, BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend, LineElement, BarElement);

const BusProvider = ({ buses, children, stops, trackers, drivers, announcements }: {
    buses: Bus[],
    stops: Stop[],
    trackers: [],
    drivers: [],
    announcements: [],
    children: React.ReactNode
}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setBuses(buses))
        dispatch(setStops(stops))
        dispatch(setTrackers(trackers))
        dispatch(setDrivers(drivers))
        dispatch(setAnnouncements(announcements))
    }, [buses, stops, trackers, drivers, announcements])


    return (<>
        {children}
    </>)
}

export default BusProvider