import CompanionForm from '@/components/CompanionForm'
import { newCompanionPermission } from '@/lib/actions/companion.actions';
import { auth } from '@clerk/nextjs/server'
import { url } from 'inspector';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, } from 'next/navigation';
import React from 'react'

const NewCompanion = async () => {
  const {userId} = await auth();
  if (!userId) redirect('/sign-in');
  const canCreateCompanion = await newCompanionPermission();
  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center'>
      {canCreateCompanion ? (
        <article className='w-full gap-4 flex flex-col'>
        <h2 className='text-2xl font-bold'>Companion Builder</h2>
        <CompanionForm/>
      </article>
      ) : (
        <article className='companion-limit'>
          <Image src='/images/limit.svg' alt='limit reached' width={360} height={230}/>
          <div className='cta-badge'>
            Upgrade your plan
          </div>
          <h1>You have reached your limit</h1>
          <p>Upgrade your plan to create more companions and sessions</p>
          <Link href='/subscription' className='btn-primary'>
            Upgrade My plan
          </Link>
        </article>
      )}
    </main>
  )
}

export default NewCompanion
