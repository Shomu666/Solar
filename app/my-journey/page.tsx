import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image'

import { currentUser } from '@clerk/nextjs/server'
import { getUserCompanions, getUserSessions } from '@/lib/actions/companion.actions'
import { redirect } from 'next/navigation'
import CompanionList from '@/components/CompanionList'

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect('/sign-in');
  const userCompanions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id)

  return (
    <main className='min-lg:w-3/4'>
      <section className='flex justify-between gap-4 max-sm:flex-col items-center'>
        <div className='flex gap-10 items-center'>

          <Image src={user?.imageUrl} alt={user?.firstName || 'profile image'} width={110} height={110} />
          <div className='flex flex-col gap-2'>
            <h2 className='text-2xl font-bold'>{user.firstName}</h2>
            <p className='text-sm text-muted-foreground'>{user.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='flex flex-col h-fit p-3 gap-2 border border-rose-950 rounded-lg'>
            <div className='flex gap-2 items-center'>
              <Image src='/icons/check.svg' alt='check' width={11} height={11}/>
              <p className='text-2xl font-bold'>{sessionHistory.length}</p>
            </div>
            <div>
              <p>Sessions completed</p>
            </div>
          </div>
          <div className='flex flex-col h-fit p-3 gap-2 border border-rose-950 rounded-lg'>
            <div className='flex gap-2 items-center'>
              <Image src='/icons/cap.svg' alt='cap' width={11} height={11}/>
              <p className='text-2xl font-bold'>{userCompanions.length}</p>
            </div>
            <div>
              <p>Companions Created</p>
            </div>
          </div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className='text-2xl font-bold cursor-pointer'>Recent Sessions</AccordionTrigger>
          <AccordionContent>
            <CompanionList title='Recent Sessions' companions={sessionHistory.map((s) => s.companions)}/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className='text-2xl font-bold cursor-pointer'>My Companions {`${userCompanions.length}`}</AccordionTrigger>
          <AccordionContent>
            <CompanionList title='My Companions' companions={userCompanions}/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  )
}

export default Profile
