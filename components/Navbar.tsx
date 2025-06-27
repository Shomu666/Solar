import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/favicon.png'
import React from 'react'
import NavbarItems from './NavbarItems'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='navbar navbar-gradient'>
        <Link href='/' className='flex items-center'>
           <Image src={Logo} alt='Logo' height={46} width={46}/>
        </Link>
        <div className='flex items-center justify-between gap-3.5'>
            <NavbarItems/>
           <SignedOut>
            <SignInButton>
              <button className='btn-signin'>Sign In</button>
            </SignInButton>
           </SignedOut>
           <SignedIn>
            <UserButton/>
           </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar
