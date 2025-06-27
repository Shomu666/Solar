'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavbarItemsArray = [{
    label: 'Home',
    href: '/'
},
{
    label: 'Companions',
    href: '/companion'
},
{
    label: 'My Journey',
    href: '/my-journey'
}]

const NavbarItems = () => {
    const pathname = usePathname();
  return (
    <nav className='flex items-center gap-3.5'>
        {
            NavbarItemsArray.map(({label, href}) => {
              const isActive = pathname === href
              return (
                 <Link href={href} key={label} className={`transition-colors duration-100 ${isActive ? 'font-bold text-pink-900' : 'text-gray-800 hover:text-black'}`}>
                  {label}
                 </Link>
              )
            })
        }
    </nav>
  )
}

export default NavbarItems
