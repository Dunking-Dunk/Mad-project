import React from 'react'
import { getBus } from '@/service/bus'
import Map from '@/components/Maps/MapBus'
import CardOverview from '@/components/OverviewCard'
import { BsBusFront, BsFillFuelPumpDieselFill } from 'react-icons/bs'
import { TbBusStop } from 'react-icons/tb'
import Status from '@/components/ActiveStatus'
import { getDistanceAndTime } from '@/lib/getDistanceAndTime'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Stepper from '@/components/Stepper'
import Image from 'next/image'
import MapBusBackTracking from '@/components/Maps/MapBusBackTracking'
import LineChart from '@/components/charts/SingeLine'
import socket from '../../../api/socket'

type Props = {
    params: {
        id: string
    }
}

const Bus = async ({ params }: Props) => {
    const bus: any = await getBus(params.id)
    const tracker = {}
    const [totalDistance, estimatedTime] = getDistanceAndTime(bus.stops_distance_time)

    // useEffect(() => {
    //     if (bus) {
    //         setTracker(bus.trackerId)
    //         socket.getBusLocation(bus.trackerId, setTracker)
    //     }

    //     return () => {
    //         socket.leaveRoom(bus.trackerId)
    //     }
    // }, [bus])

    if (bus && tracker)
        return (<div className='w-full h-full pb-5 space-y-8'>
            <div className='grid grid-cols-5 space-x-5'>
                <div className='h-[700px] col-span-4 relative'>
                    <Map stops={bus.stops} busPoly={bus.stops_polyline} id={params.id} />
                    <div className='absolute bottom-10 left-1/2 -translate-x-1/2 bg-primary p-2 rounded-2xl flex flex-row space-x-6 items-center'>
                        <Status active={bus.status} size={9} />
                        <div className='flex flex-col'>
                            <CardDescription>Speed</CardDescription>
                            <h5 className='text-secondary font-bold text-lg'>50 Km/h</h5>
                        </div>
                        <div className='flex flex-col'>
                            <CardDescription>Total Distance </CardDescription>
                            <h5 className='text-secondary font-bold text-lg'>{totalDistance} Km</h5>
                        </div>
                        <div className='flex flex-col'>
                            <CardDescription>Total Estimated Time</CardDescription>
                            <h5 className='text-secondary font-bold text-lg'>{estimatedTime}</h5>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col space-y-2'>
                    <CardOverview title='Bus' description='Bus number/set' value={`${bus.busNumber}/${bus.busSet}`} Icon={<BsBusFront />} />
                    <CardOverview title='Name' description='Bus Name' value={bus.busName} Icon={<BsBusFront />} />
                    <CardOverview title='Fuel' description='Type of fuel used' value='CNG' Icon={<BsFillFuelPumpDieselFill />} />
                    <CardOverview title='Status' description='Current status of the bus' value={<Status active={bus.status} size={9} />} Icon={<TbBusStop size={20} />} />
                </div>
            </div>

            <div className='space-y-4'>
                <h3 className='text-4xl font-bold'>Stops</h3>
                <div className='flex flex-row space-x-6 w-full'>
                    <Stepper steps={bus.stops} distance_time={bus.stops_distance_time} />
                    <div className='flex flex-col space-y-2 w-full'>
                        {
                            bus.stops.map((stop: Stop, index: any) => {
                                return (
                                    <Card className='h-full p-4 space-y-1' key={index}>
                                        <div className='flex flex-row justify-between '>
                                            <CardTitle>{index + 1}) {stop.name}</CardTitle>
                                        </div>
                                        <CardDescription>{stop.address}</CardDescription>
                                        {index === 0 && (
                                            <div className='py-2'>
                                                <CardDescription>Starting Stop</CardDescription>
                                            </div>
                                        )}
                                        {index >= 1 && (
                                            <div className='py-2'>
                                                <CardDescription>Estimated distance from prev stop</CardDescription>
                                                <p className='font-bold'>{(bus.stops_distance_time[index - 1]?.distance / 1000).toFixed(2)} Km</p>
                                                <CardDescription>Estimated duration from prev stop</CardDescription>
                                                <p className='font-bold'>{Math.floor(bus.stops_distance_time[index - 1]?.duration / 60)} min</p>
                                            </div>
                                        )}

                                    </Card>)
                            })
                        }
                    </div>
                    <div className='flex flex-col w-1/3 space-y-4'>
                        <Card className='w-full'>
                            <CardHeader>
                                <h3 className='font-bold text-4xl'>Bus Details</h3>
                                <CardDescription>{bus.busName}</CardDescription>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-y-4'>
                                <div className='space-y-1'>
                                    <CardTitle>Total Stops</CardTitle>
                                    <CardDescription>{bus.stops.length}</CardDescription>
                                </div>
                                <div className='space-y-1'>
                                    <CardTitle>Description</CardTitle>
                                    <CardDescription>{bus.description}</CardDescription>
                                </div>
                                <div className='space-y-1'>
                                    <CardTitle>Origin</CardTitle>
                                    <CardDescription>{bus.origin}</CardDescription>
                                </div>
                                <div className='space-y-1'>
                                    <CardTitle>Total Seats</CardTitle>
                                    <CardDescription>{bus.seats}</CardDescription>
                                </div>
                                <div className='space-y-1'>
                                    <CardTitle>AC</CardTitle>
                                    <Status active={bus.ac} size={9} />
                                </div>
                            </CardContent>
                        </Card>
                        {bus.driver && (<Card className='w-full'>
                            <CardHeader>
                                <h3 className='font-bold text-4xl'>Driver</h3>
                                <CardDescription>{bus.busName}</CardDescription>
                            </CardHeader>
                            <CardContent className='flex flex-row gap-x-4'>
                                <Image src={bus.driver.image.url} alt='hello' width={80} height={80} className='rounded-full' />
                                <div className='flex flex-col'>
                                    <h3>{bus.driver.name}</h3>
                                    <CardDescription>{bus.driver.phoneNumber}</CardDescription>
                                </div>
                            </CardContent>
                        </Card>)}

                    </div>
                </div>
            </div>

            <div className='flex flex-col space-y-2'>
                <div className='w-full space-y-2'>
                    <h3 className='text-2xl font-bold '>Back Tracking</h3>
                    <div className='h-[600px] w-full relative'>
                        <MapBusBackTracking id={bus.tracker} />
                    </div>
                </div>
                <div className='w-full space-y-2'>
                    <h3 className='text-2xl font-bold '>Speed Graph</h3>
                    <div className='h-[800px] w-full'>
                        <LineChart id={bus.tracker} />
                    </div>
                </div>
            </div>
        </div>)

}

export default Bus