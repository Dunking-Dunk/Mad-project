import React from "react";

import {
    Tabs,
    TabsList,
} from "@/components/ui/tabs"
import NavigationLink from "@/components/NavigationLink";

type Props = {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <div className="w-full h-full">
            <div className="flex flex-col w-full h-full gap-y-4">
                <h1 className="font-bold text-4xl">Announcement</h1>
                <Tabs defaultValue="allBus" >
                    <TabsList className="grid grid-cols-2 w-1/5 mb-5">
                        <div className="flex items-center justify-center hover:bg-card w-full h-full rounded-lg">
                            <NavigationLink href="/announcement">Announcements</NavigationLink>
                        </div>

                        <div className="flex items-center justify-center hover:bg-card w-full h-full rounded-lg"> <NavigationLink href="/announcement/new">New</NavigationLink></div>
                    </TabsList>
                </Tabs>
                {children}
            </div>
        </div>
    )
}