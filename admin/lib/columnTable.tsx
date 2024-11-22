'use client'

import React from 'react'
import AlertDialog from '@/components/AlertDialogue'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  ColumnDef,
} from '@tanstack/react-table'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { deleteBus } from "@/store/busReducer"
import store from '@/store/store'
import Link from 'next/link'
import { deleteStop } from '@/store/stopReducer'
import { deleteDriver } from '@/store/driverReducer'


export const busColumns: ColumnDef<Bus>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "busName",
    header: 'Bus Name'
  },
  {
    accessorKey: "busNumber",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bus Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },

  {
    accessorKey: "busSet",
    header: "Bus Set",
  },

  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "seats",
    header: "Total Seats",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const id: string = row.getValue('id');

      return (
        <div className='flex space-x-4 items-center'>
          <Link href={`/bus/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>View</Link>
          <Link href={`/bus/update/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>Update</Link>
          <AlertDialog content='The following will be permanently deleted' onClick={async () => {
            store.dispatch(deleteBus(id))
          }}>
            Delete
          </AlertDialog>
        </div>
      )
    }
  }
]

export const stopColumn: ColumnDef<Stop>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Stop",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: 'busId',
    header: 'No of buses',
    cell: ({ row }) => {
      const busId: [] = row.getValue('busId');

      return <p>{busId.length}</p>
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const id: string = row.getValue('id');

      return (
        <div className='flex space-x-4'>
          <AlertDialog content='The following will be permanently deleted' onClick={async () => {
            store.dispatch(deleteStop(id))
          }}>
            Delete
          </AlertDialog>
        </div>
      )
    }
  }
]


export const driverColumns: ColumnDef<Driver>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const img: Image = row.getValue('image');

      return (
        <Avatar>
          <AvatarImage src={img.url} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )
    }
  },

  {
    accessorKey: "name",
    header: "Name",

  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "busId",
    header: "Bus ID",
  },
  {
    accessorKey: 'bus',
    header: "Bus",
    cell: ({ row }) => {
      const busId = row.getValue('busId')
      const { buses } = store.getState().Bus
      const bus = buses.find((bus: any) => bus.id === busId)
      if (bus) {
        return (
          <div>
            <p>{bus?.busNumber} / {bus?.busSet}</p>
            <p>{bus?.busName}</p>
          </div>
        )
      } else {
        return (
          <div>
            <p>no bus</p>
          </div>

        )
      }
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const id: string = row.getValue('id');

      return (
        <div className='flex space-x-4'>
          <AlertDialog content='The following will be permanently deleted' onClick={async () => {
            store.dispatch(deleteDriver(id))
          }}>
            Delete
          </AlertDialog>
        </div>
      )
    }
  }
]