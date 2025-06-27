import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CallToAction = () => {
  return (
    <section className='cta-section'>
      <div className='cta-badge'>Start Learning your way</div>
      <h2 className='text-3xl font-bold'>Build personalized learning companions</h2>
      <p>Pick a name, subject, voice and personality - and start learning through voice conversations that feels natural and easy</p>
      <Image src='images/cta.svg' alt='cta-image' width={365} height={250} />
      <button className='btn-primary'>
        <Image src='icons/plus.svg' alt='icon' width={12} height={12}/>
        <Link href='/companion/new'>
          <p>Create your companion</p>
        </Link>
      </button>

    </section>
  )
}

export default CallToAction
