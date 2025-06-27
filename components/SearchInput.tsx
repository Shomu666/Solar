"use client"

import Image from 'next/image'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('topic') || '';

  const [searchValue, useSearchValue] = useState('')

  useEffect(() => {
     
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        params.set('topic', searchValue);
      } else {
        params.delete('topic');
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 800);
  
    return () => clearTimeout(delayDebounce);
  }, [searchValue, pathname, router, searchParams])
  return (
    <div className='relative flex gap-2 px-2 py-1 h-fit border border-black rounded-lg'>
      <Image src='/icons/search.svg' alt='search' width={15} height={15}/>
      <input className='outline-none' placeholder='Search companions...' value={searchValue} onChange={(e) => useSearchValue(e.target.value)}/>
    </div>
  )
}

export default SearchInput
