"use client"

import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import axios from "@/api/axios";

const SingleLine = (props: any) => {
    const [speedData, setSpeedData] = useState({
        speed: [],
        time: []
    })

    useEffect(() => {
        const helper = async () => {
            const res = await axios.get(`/data/backtrack/${props.id}?days=2`)
            const data = res.data
            const speed = data.map((a: any) => a.speed)
            const time = data.map((a: any) => a.createdAt)
            setSpeedData({ speed, time })
        }

        helper()
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const labels = speedData.time;

    const data = {
        labels,
        datasets: [
            {
                label: 'speed',
                data: speedData.speed,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return <Line options={options} data={data} />;
}

export default SingleLine