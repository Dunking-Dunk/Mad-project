'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    children: string,
    href: string,
    className?: string
}

const NavigationLink = ({ children, href, className}:Props) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link href={href} className={`${className} text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-[#F94C10]' : 'text-primary'}`}>
            {children}
        </Link>
    )
}

export default NavigationLink