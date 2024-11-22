"use client"

import React from "react";
import { faker } from "@faker-js/faker";
import { Bar } from "react-chartjs-2";

const Chart = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const labels = ['1 a', '1 b', '2 a', '3 a', '3b', '4a', '4c'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Buses:Stops',
                data: labels.map(() => faker.number.int({ min: 0, max: 15 })),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (<div className="w-1/2 h-[400px]">
        <Bar options={options} data={data} />
    </div>);
}

export default Chart