"use client"

import { Button } from '@/components/ui/button';
import { Loader2, Mic, MicOff, PhoneOff, User, Video, VideoOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';

const VideoCall = ({sessionId,token}) => {

    const [isLoading,setIsLoading] = useState(true);

    const [scriptLoaded,setScriptLoaded] = useState(false);

    const [isConnected,setIsConnected] = useState(false);

    const [isVideoEnabled,setIsVideoEnabled] = useState(true);

    const[isAudioEnabled,setIsAudioEnabled]  = useState(true);

    const sessionRef = useRef(null);
    const publisherRef = useRef(null);

    const router = useRouter();

    const appId = process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID;


    if(!sessionId || !token || !appId){
        return (
            <div className='container mx-auto px-4 py-12 text-center'>
                <h1 className='text-3xl font-bold text-white mb-4'>
                       Invalid Video Call
                </h1>
                <p className='text-muted-foreground mb-6'>
                    Missing required parameters for the video call.
                </p>

             <Button
             onClick = {()=> router.push("/appointments")}
             className={'bg-blue-600 hover:bg-blue-700'}
             >
             Back to Appointments
             </Button>
            </div>
        )
    }

    const handleScriptLoad = ()=>{
        setScriptLoaded(true);
 

        //Check if Vonage OpenTok (OT) object is available 
        if(!window.OT){
            toast.error("Failed to load Vonage video api");
            setIsLoading(false);
            return;
        }

        initializeSession();
    };

    const initializeSession = ()=>{

        if(!appId || !sessionId || !token){
            toast.error("Missing required video call parameters");
            router.push("/appointments");
            return;
        }

        try {

            sessionRef.current = window.OT.initSession(appId, sessionId);
            sessionRef.current.on("streamCreated",(event)=>{
                sessionRef.current.subscribe(event.stream,"subscriber",{
                    insertMode: "append",
                    width: "100%",
                    height: "100%",
                },
            (error)=>{
                if(error){
                    toast.error("Error connecting to other participant's stream");
                }
            });
            });

            sessionRef.current.on("sessionConnected",()=>{
                setIsConnected(true);
                setIsLoading(false);

                publisherRef.current = window.OT.initPublisher("publisher",{
                    insertMode: "replace",
                    width: "100%",
                    height: "100%",
                    publishAudio: isAudioEnabled,
                    publishVideo: isVideoEnabled,
                },
                (error)=>{
                    if(error){
                        console.error("Publisher error: ",error);
                        toast.error("Error initializing your camera and microphone");
                    }
                    else{
                        console.log("Publisher initialized successfully - you should see your video now");
                    }
                }
            )
            });


            sessionRef.current.on("sessionDisconnected",()=>{
                setIsConnected(false);
            });

            sessionRef.current.connect(token,(error)=>{
                if(error){
                    toast.error("Error connecting to video session");
                }else{

                    if(publisherRef.current){
                        sessionRef.current.publish(publisherRef.current, (error)=>{
                            if(error){
                                console.log("Error publishing stream: ",error);
                                toast.error("Error publishing your stream");
                            }
                            else{
                                console.log("Stream published successfully!");
                            }
                        })
                    }
                }
            })
            
        } catch (error) {

            toast.error("Failed to initialize video call");
            setIsLoading(false);       
        }
    };

    const toggleVideo = () =>{

        if(publisherRef.current){
            publisherRef.current.publishVideo(!isVideoEnabled);
            setIsVideoEnabled((prev)=>!prev);
        }
    }


    const toggleAudio = ()=>{
        if(publisherRef.current){
            publisherRef.current.publishAudio(!isAudioEnabled);
            setIsAudioEnabled((prev)=>!prev);
        }
    };

    const endCall = ()=>{
        if(publisherRef.current){
            publisherRef.current.destroy();
            publisherRef.current = null;
        }

        if(sessionRef.current){
            sessionRef.current.disconnect();
            sessionRef.current = null;
        }

        router.push("/appointments");

    };


    useEffect(()=>{
        return ()=>{
            if(publisherRef.current){
                publisherRef.current.destroy();
            }
            if(sessionRef.current){
                sessionRef.current.disconnect();
            }
        }
    },[]);


  return (
    <>
    <Script
      src="https://unpkg.com/@vonage/client-sdk-video@latest/dist/js/opentok.js"
      onLoad={handleScriptLoad}
      onError={()=>{
        toast.error("Failed to load video call script");
        setIsLoading(false);
      }}
    />
    <div className='container mx-auto px-4 py-8'>
        <div className='text-center mb-6'>
           <h1 className='text-3xl font-bold text-white mb-2'>
            You&apos;re in a Video Session
           </h1>
           <p className='text-muted-foreground'>
                 {isConnected?<span className='text-green-500'>Connected</span>: isLoading? <span>Connecting...</span>:<span className='text-red-500'>Connection failed</span>}
           </p>
        </div>


        {isLoading && !scriptLoaded? (
            <div className='flex flex-col items-center justify-center py-12 '>
                <Loader2 className='h-12 w-12 text-blue-400 animate-spin mb-4'/>
                <p className='text-white text-lg'>
                        Loading video call components...
                </p>
        </div>
        ):
        (
            <div className='space-y-6'>
                 <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='border border-blue-900/20 shadow-md shadow-black/60 rounded-lg overflow-hidden '>

                     <div className='bg-blue-900/10 px-3 py-2 text-blue-400 text-sm font-medium'>
                               You
                     </div>

                     <div className='w-full h-[300px] md:h-[400px] bg-muted/30' id='publisher'>
                       {!scriptLoaded && (
                        <div className='flex items-center justify-center h-full'>
                            <div className='bg-muted/20 rounded-full p-8'>
                            <User className='h-12 w-12 text-blue-400'/>

                            </div>
                        </div>
                       )}
                     </div>

                    </div>
                    <div className='border border-blue-900/20 rounded-lg overflow-hidden '>
                         <div className='bg-blue-900/10 px-3 py-2 text-blue-400 text-sm font-medium'>
                         Other Participants
                         </div>
                         <div
                         id='subscriber'
                         className='w-full h-[300px] md:h-[400px] bg-muted/30'
                         >

                            {(!isConnected || !scriptLoaded) && (<div className='flex items-center justify-center h-full'>

                                <div className='bg-muted/20 rounded-full p-8'>
                                <User className='h-12 w-12 text-blue-400'/>

                                </div>

                            </div>)}

                         </div>
                    </div>
                    
                 </div>

                 <div className='flex justify-center space-x-4'>
                   <Button
                   variant={'outline'}
                   size={'lg'}
                   onClick ={toggleVideo}
                   className={`rounded-full p-4 h-14 w-14 ${isVideoEnabled?"border-blue-900/30":"bg-red-900/20 border-red-900/40 text-red-400"}`}
                   disabled = {!publisherRef.current}
                   >
                     {isVideoEnabled ?<Video/>: <VideoOff/>}
                   </Button>

                   <Button 
                   variant={'outline'}
                   size={'lg'}
                   onClick={toggleAudio}
                   className={`rounded-full p-4 h-14 w-14 ${
                    isAudioEnabled?"border-blue-900/30":"bg-red-900/20 border-red-900/30 text-red-400"
                   }`}
                   disabled={!publisherRef.current}
                   >
                    {isAudioEnabled?<Mic/>:<MicOff/>}

                   </Button>
                   <Button
                   variant={'destructive'}
                   size={'lg'}
                   onClick={endCall}
                   className={'rounded-full p-4 h-14 w-14 bg-red-600 hover:bg-red-700'}
                   >
                         <PhoneOff/>
                   </Button>
                 </div>

              
              <div className='text-center'>
                  <p className='text-muted-foreground text-sm'>
                    {isVideoEnabled ? "Camera On":"Camera Off"}
                 {" "}   •{" "}
                    {isAudioEnabled ? "Microphone On":"Microphone Off"}
                  </p>
                  <p className='text-muted-foreground text-sm mt-1'>
                     When your consultation is complete, hang up by clicking the red button.
                  </p>
              </div>

            </div>
        )
        }

     
    </div>
    </>
  )
}

export default VideoCall