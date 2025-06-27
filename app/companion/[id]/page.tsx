import CompanionComponent from '@/components/CompanionComponent'
import { getCompanion } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

export const dynamic = 'force-dynamic';

interface CompanionSessionPageProps {
  params: {
    id: string
  }
}

const CompanionSession = async ({params} : CompanionSessionPageProps) => {
  if(!params?.id) redirect('/companion')
  const activeCompanion = await getCompanion(params.id)
  const user = await currentUser();


  if(!user) redirect('/sign-in')
  if(!activeCompanion) redirect('/companion')  
  
  return (
    <main>
      <article className='flex justify-between rounded-border p-6 max-md:flex-col'>
        <div className='flex items-center gap-2'>
          <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden' style={{backgroundColor: getSubjectColor(activeCompanion.subject)}}>
            <Image src={`/icons/${activeCompanion.subject}.svg`} alt='icon' width={35} height={35}/>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <p className='text-2xl font-bold'>{activeCompanion.name}</p>
              <div className='subject-badge max-sm:hidden'>
                {activeCompanion.subject}
              </div>
            </div>
            <p className='text-lg'>{activeCompanion.topic}</p>
          </div>
        </div>
        <div className='items-start text-2xl max-md:hidden'>
          {activeCompanion.duration} minutes
        </div>
      </article>
        <CompanionComponent name={activeCompanion.name} subject={activeCompanion.subject} topic={activeCompanion.topic} style={activeCompanion.style} voice={activeCompanion.voice} companionId={params.id}
        userName={user.firstName!} userImage={user.imageUrl!}/>
    </main>
  )
}

export default CompanionSession
