'use client'

import * as React from 'react'

type Props = {
    steps: [],
    distance_time?: any
}

function StepperComp({ steps, distance_time }: Props) {
    const [activeStep, setActiveStep] = React.useState(0);

    return (
        <div className='flex flex-col justify-between relative my-5 '>

            {steps.map((step, index) => {
                return (
                    <div key={index} className='rounded-full h-8 w-8 bg-primary z-10 text-secondary flex items-center justify-center relative'>{index + 1}
                        {distance_time && index < distance_time.length && <p className='text-primary w-20 absolute -left-2 rotate-90 top-28'>{(distance_time[index]?.distance / 1000).toFixed(2)
                        } Km</p>}
                    </div>
                )
            })}
            <div className='w-1 h-full bg-primary rotate-180 z-1 absolute left-1/2 -translate-x-1/2 rounded-lg' />

        </div>
    )
}

export default StepperComp