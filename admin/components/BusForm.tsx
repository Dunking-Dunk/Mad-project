"use client"

import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Combobox } from "./ComboBox"
import { createBus } from '@/store/busReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'
import MapStop from '@/components/Maps/MapStopPicker'
import { useToast } from "@/components/ui/use-toast"
import Loader from './Loader'

type Props = {
  update?: boolean
  id?: string
}

const BusForm = ({ update }: Props) => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state: any) => state.Bus)
  const { drivers } = useAppSelector((state: any) => state.Driver)
  const [selectedStop, setSelectedStop] = useState<any>({})
  const { toast } = useToast()

  const FormSchema = z.object({
    busName: z.string().min(2, {
      message: "Bus name must be at least 2 characters.",
    }),
    busNumber: z.number(),
    busSet: z.string().min(1, {
      message: "Bus set must be at least 1 characters."
    }),
    description: z.string().min(3, {
      message: "Bus description must be at least 3 characters."
    }),
    origin: z.string().min(3, {
      message: "Bus origin must be at least 3 characters."
    }),
    seats: z.number().default(0),
    status: z.boolean().default(false).optional(),
    ac: z.boolean().default(false).optional(),
    gpsId: z.string(),
    driver: z.string()
  })

  const form = useForm<z.infer<typeof FormSchema>>(
    {
      resolver: zodResolver(FormSchema),
      defaultValues: {
        busName: '',
        busNumber: 0,
        busSet: '',
        description: '',
        origin: '',
        seats: 0,
        status: false,
        ac: false,
        driver: '',
        gpsId: ''
      }
    }
  )

  const driversFiltered = drivers.filter((driver: any) => !driver.busId)
  const driversModified = driversFiltered.map((drivers: any) => ({ label: drivers.name, value: drivers.id }))

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (selectedStop.stops && selectedStop.stops.length >= 2) {
      const body = {
        ...data,
        stops: selectedStop.stops.map((stop: Stop) => stop.id),
        stops_polyline: selectedStop.poly_decode,
        stops_distance_time: selectedStop.distanceAndDuration
      }

      dispatch(createBus(body)).then((state: any) => {
        if (!state.error) {
          toast({
            title: "Successfully Created",
            description: "Created a new bus",
            variant: 'default'
          })
        } else {
          toast({
            title: "error",
            description: "could not create a bus.please try again later",
            variant: 'destructive'
          })
        }
        form.reset()
        setSelectedStop(null)
      })
    } else {
      toast({
        title: "Stops Required",
        description: "please select two or more stops",
        variant: 'destructive'
      })
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 ">
        <FormField
          control={form.control}
          name="busName"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Route Name</FormLabel>
              <FormControl>
                <Input placeholder="Bus Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="busNumber"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Route Number</FormLabel>
              <FormControl>
                <Input placeholder="Bus Number" {...field} onChange={event => field.onChange(event.target.valueAsNumber)} value={field.value} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="busSet"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Route Set</FormLabel>
              <FormControl>
                <Input placeholder="Bus Set" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Route Description</FormLabel>
              <FormControl>
                <Textarea placeholder="enter route info" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Route origin</FormLabel>
              <FormControl>
                <Input placeholder="Starting point of the bus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-y-4'>
          <h3 className='text-xl font-bold'>Stops</h3>
          <MapStop setSelectedStop={setSelectedStop} selectedStop={selectedStop} />
        </div>
        <FormField
          control={form.control}
          name="seats"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Total seats</FormLabel>
              <FormControl>
                <Input placeholder="Total number of seats" onChange={event => field.onChange(event.target.valueAsNumber)} value={field.value} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ac"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>AC Bus</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="airplane-mode">AC</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="airplane-mode">Active</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-y-4'>
          <FormDescription>Enter the GPS ID associated with the iot module</FormDescription>
          <FormField
            control={form.control}
            name="gpsId"
            render={({ field }) => (
              <FormItem className='w-3/6'>
                <FormLabel>GPS ID</FormLabel>
                <FormControl>
                  <Input placeholder="GPS ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormDescription>Driver can also be added later</FormDescription>
        {drivers && (
          <FormField
            control={form.control}
            name="driver"
            render={({ field }) => (
              <FormItem className="space-x-4">
                <FormLabel>Drivers</FormLabel>
                <FormControl>
                  <Combobox list={driversModified} title='drivers' onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {
          loading ? <Loader /> : <Button type="submit" className='w-3/6'>Create</Button>
        }
      </form>
    </Form>
  )
}

export default BusForm