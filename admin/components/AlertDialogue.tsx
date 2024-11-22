"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type Props = {
  content: string,
  children: React.ReactNode,
  onClick: () => void,
}

import { useAppSelector } from "@/store/store"
import Loader from "./Loader"

export default function Alert({ content, children, onClick }: Props) {
  const { loading } = useAppSelector((state) => state.Bus)
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {loading ? <Loader /> : (<Button variant='destructive'>{children}</Button>)}

      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {content}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}