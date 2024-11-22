"use client"

import { Scatter } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

const Chart = () => {
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const data = {
        datasets: [
            {
                label: 'buses: total distance covers (km)',
                data: Array.from({ length: 50 }, () => ({
                    x: faker.number.int({ min: 0, max: 50 }),
                    y: faker.number.int({ min: 0, max: 100 }),
                })),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };


    return (
        <div className='w-[50%]'>
            <Scatter options={options} data={data} />
        </div>

    )
}

export default Chart