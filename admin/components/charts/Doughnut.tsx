'use client'

import React from 'react';
import { Doughnut } from 'react-chartjs-2';


const Chart = ({ active, inactive }: any) => {

    const data = {
        labels: ['Red', 'Yellow', 'Green'],
        datasets: [
            {
                label: 'buses satus',
                data: [3, inactive + 1, active],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return <Doughnut data={data} />
}

export default Chart