"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from '@/store/store'
import Loader from './Loader'
import { createTracker } from '@/store/trackerReducer'
 
export default function CreateTracker() {
    const dispatch = useAppDispatch()
    const {loading} = useAppSelector((state) => state.Tracker)

    const FormSchema = z.object({
       gpsId: z.string().min(2, 'required more than 2 character'),
    })

    const form = useForm<z.infer<typeof FormSchema>>(
        {
            resolver: zodResolver(FormSchema),
            defaultValues: {
               gpsId: ''
            }
        }
    )

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        dispatch(createTracker(data))
    }
        
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Tracker</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Tracker</DialogTitle>
          <DialogDescription>
            Create a Tracker with the gps-id which is mention in the iot module, so to connect with the bus
          </DialogDescription>
        </DialogHeader>
              <div className="grid gap-4 py-4">

                  <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 ">
                          <FormField
            control={form.control}
            name="gpsId"
            render={({ field }) => (
              <FormItem className='w-3/6'>
                <FormLabel>GPS ID</FormLabel>
                <FormControl>
                  <Input placeholder="id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>   )}
                          />
                          <DialogFooter>
            {loading ? <Loader/> : <Button type="submit">Create Tracker</Button>}
          
        </DialogFooter>
        </form>
                    </Form>
                  </div>
      </DialogContent>
    </Dialog>
  )
}
