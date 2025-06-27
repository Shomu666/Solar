import CallToAction from '@/components/CallToAction'
import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import { recentSessions } from '@/constants'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

const Page =async () => {

  const companions = await getAllCompanions({limit: 3});
  const recentSessionCompanions = await getRecentSessions({limit: 10})
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className='home-section'>
      {companions.map((companion) => {
        return (
          <CompanionCard key={companion.id} id={companion.id} name={companion.name} subject={companion.subject} topic={companion.topic} duration={companion.duration} color={getSubjectColor(companion.subject)}/>
        )
      })}
      </section>
      <section className='home-section'>
        <CompanionList title='Recently finished sessions' companions={recentSessionCompanions} classnames='w-2/3 max-lg:w-full'/>
        <CallToAction/>
      </section>
    </main>
  )
}

export default Page