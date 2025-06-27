'use client'

import { configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk';
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '@/constants/soundwaves.json'
import { id } from 'zod/v4/locales';
import { addToSessionHistory } from '@/lib/actions/companion.actions';


enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  END = 'END'
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
  id: string;
}

const CompanionComponent = ({ companionId, subject, topic, name, voice, style, userImage, userName }: CompanionComponentProps) => {

  const [callStatus, setCallstatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([])

  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted)
  }

  const handleCall = async () => {
    setCallstatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: {
        subject, topic, style
      },
      clientMessages: ['transcript'],
      serverMessages: []
    }
    //@ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides)
  }

  const handleDisconnect = () => {
    setCallstatus(CallStatus.END);
    vapi.stop()
  }

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop()
      }
    }
  }, [isSpeaking])

  useEffect(() => {
    const onCallStart = () => setCallstatus(CallStatus.ACTIVE);
    const onCallEnd = () => {
      setCallstatus(CallStatus.END)
      addToSessionHistory(companionId);
    };
    const onMessage = (message: Message) => {
     
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessages = {
          role: message.role as 'user' | "system" | "assistant",
          content: message.transcript,
          id: crypto.randomUUID()
        }
        setMessages((prev) => [newMessages, ...prev])
      }

    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log(error.message)

    vapi.on('call-start', onCallStart)
    vapi.on('call-end', onCallEnd)
    vapi.on('message', onMessage)
    vapi.on('speech-start', onSpeechStart)
    vapi.on('call-end', onSpeechEnd)

    return () => {
      vapi.off('call-start', onCallStart)
      vapi.off('call-end', onCallEnd)
      vapi.off('message', onMessage)
      vapi.off('speech-start', onSpeechStart)
      vapi.off('call-end', onSpeechEnd)
    }
  }, [])
  return (
    <section className='flex flex-col h-[70vh]'>
      <section className='flex gap-8 max-sm:flex-col'>
        <div className='companion-section'>
          <div className='companion-avatar' style={{ backgroundColor: getSubjectColor(subject) }}>
            <div className={`absolute transition-opacity duration-1000 ${callStatus === CallStatus.INACTIVE || callStatus === CallStatus.END ? 'opacity-100' : 'opacity-0'} ${(callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING) && 'opacity-100 animate-pulse'}`}>
              <Image src={`/icons/${subject}.svg`} alt='logo' width={150} height={150} className='max-sm:w-fit'/>
            </div>
            <div className={`absolute transition-opacity duration-1000 ${callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'}`}>
              <Lottie lottieRef={lottieRef} animationData={soundwaves} autoplay={false} className='companion-lottie' />
            </div>
          </div>
          <p className='text-2xl font-bold'>{name}</p>
        </div>
        <div className='user-section'>
          <div className='user-avatar'>
            <Image src={userImage} alt='userImage' width={130} height={130} className='rounded-full' />
            <p className='text-2xl font-bold'>{userName}</p>
          </div>
          <button className='btn-mic' onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
            <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt='mic-icon' width={35} height={35} />
            <p className='max-sm:hidden'>{isMuted ? 'Turn on microphone' : 'Turn off microphone'}</p>
          </button>
          <button className={`rounded-lg py-2 transition-colors w-full cursor-pointer text-white ${callStatus === CallStatus.ACTIVE ? 'bg-rose-800' : 'bg-primary'} ${callStatus === CallStatus.CONNECTING && 'animate-pulse'}`} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
            {callStatus === CallStatus.ACTIVE ? 'End Session' : callStatus === CallStatus.CONNECTING ? 'Connecting' : 'Start Session'}
          </button>
        </div>
      </section>
      <section className='flex flex-col h-[70vh]'>
        <section className='transcript'>
          <div className='transcript-message no-scrollbar'>
            {messages.map((message) => {
              if (message.role === 'assistant') {
                return (
                  <p key={message.id} className='max-sm:text-sm'>
                    {name.split(' ')[0].replace(/[,.]/g, '')}: {message.content}
                  </p>
                )
              } else {
                return (
                  <p key={message.id} className='text-primary max-sm:text-sm'>
                    {userName}: {message.content}
                  </p>
                )
              }
            })}
          </div>
          <div className='transcript-fade' />
        </section>
      </section>
    </section>
  )
}

export default CompanionComponent
