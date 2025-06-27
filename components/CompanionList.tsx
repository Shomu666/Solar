import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import Image from 'next/image'
import { getSubjectColor } from '@/lib/utils';
interface CompanionListProps {
  title: string;
  companions?: Companion[];
  classnames?: string;
}

const CompanionList = ({ title, companions, classnames }: CompanionListProps) => {
  return (
    <article className={`companion-list ${classnames}`}>
      <h2 className='text-3xl font-bold'>{title}</h2>
      <Table>
        <TableHeader >
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className='text-lg'>Subject</TableHead>
            <TableHead className='text-lg text-right'>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {companions?.map(({id, name, subject, topic, duration}) => {
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link href={`/companion/${id}`}>
                    <div className='flex items-center gap-2'>
                      <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden' style={{ backgroundColor: getSubjectColor(subject) }}>
                        <Image src={`/icons/${subject}.svg`} alt='icon' width={35} height={35} />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-2xl font-bold'>{name}</p>
                        <p className='text-lg'>{topic}</p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className='subject-badge w-fit max-md:hidden'>
                    {subject}
                  </div>
                  <div className='flex items-center justify-center w-fit p-2 rounded-lg md:hidden' style={{ backgroundColor: getSubjectColor(subject) }}>
                    <Image src={`/icons/${subject}.svg`} alt='subject-icon' width={18} height={18} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center p-1 text-lg font-semibold'>
                    {duration} minutes
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
          
        </TableBody>
      </Table>
    </article>
  )
}

export default CompanionList
