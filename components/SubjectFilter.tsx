"use client"

import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from '@/constants'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'


const SubjectFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if(selectedSubject === "All"){
      params.delete('subject')
    } else if(selectedSubject){
      params.set('subject', selectedSubject);
    }
    router.push(`${pathname}?${params.toString()}`)
  }, [selectedSubject])
  return (
    <Select onValueChange={(value) => setSelectedSubject(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          <SelectItem value='All'>All Subjects</SelectItem>
          {subjects.map((subject) => {
            return (
              <SelectItem value={subject} key={subject} className='capitalize'>{subject}</SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SubjectFilter
