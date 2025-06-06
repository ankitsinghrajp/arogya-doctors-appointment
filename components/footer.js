import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#212327] border-t-2 border-white/20 py-8">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="flex justify-center items-center">
                  <div className="flex flex-col">
                    <h2 className="font-bold dark:text-gray-200 mb-2 text-lg">
                      GET IN TOUCH
                    </h2>
                    <span className="text-sm font-semibold my-2 text-gray-800 dark:text-gray-400">
                      Developer@ Ankit Singh Rajput{" "}
                    </span>
                    <span className=" text-sm font-semibold my-2 text-gray-800 dark:text-gray-400">
                      Contact: ankitsinghchouhan682@gmail.com
                    </span>
                    <div className='flex items-center gap-2'>
                       <span className=' text-sm font-semibold my-2 text-gray-800 dark:text-gray-400'>Developer&apos;s Portfolio:</span>
                       {" "} 
                       <Link className='text-blue-500 underline italic font-bold text-xs hover:text-blue-700' href={'https://ankits-portfolio-omega.vercel.app/'}>
                          Visit Website
                       </Link>
                    </div>
                    <span className="text-center  text-sm font-semibold flex gap-3 item-center my-2">
                      <Link href={"https://github.com/ankitsinghrajp"}>
                        <Image
                          src={"/github.png"}
                          width={24}
                          height={24}
                          alt="github"
                        />
                      </Link>
                      <Link href="https://www.linkedin.com/in/ankit-singh-chouhan-6612bb252/">
                        {" "}
                        <Image
                          src={"/linkedin.png"}
                          width={24}
                          height={24}
                          alt="linkedin"
                        />
                      </Link>
                      <Link href="https://www.instagram.com/">
                        {" "}
                        <Image
                          src={"/instagram.png"}
                          width={24}
                          height={24}
                          alt="instagram"
                        />
                      </Link>
                      <Link href="https://x.com/AnkitSingh60125">
                        {" "}
                        <Image
                          src={"/twitter.png"}
                          width={24}
                          height={24}
                          alt="twitter"
                        />
                      </Link>
                    </span>

                    <div className="flex md:hidden mt-10 flex-col">
                      <h2 className="font-bold text-lg mb-2 dark:text-gray-200">
                        MY OTHER PROJECTS
                      </h2>
                      <Link
                        className="text-sm mb-1 text-blue-600"
                        href="https://elevate-ai-iota.vercel.app/"
                      >
                        &gt; Ankit&apos;s Elevate AI{" "}
                      </Link>
                      <Link
                        className="text-sm mb-1 text-blue-600 "
                        href="https://car-vision.vercel.app/"
                      >
                        &gt; AI Car Market Place
                      </Link>
                      <Link
                        className="text-sm mb-1 text-blue-600 "
                        href="http://sprint-board-nine.vercel.app/"
                      >
                        &gt; Sprint Board
                      </Link>
                      <Link
                        className="text-sm mb-1 text-blue-600 "
                        href="https://ai-finance-management-seven.vercel.app/"
                      >
                        &gt; AI Finance Management
                      </Link>
                 
                    </div>
                  </div>
                </div>
                <div className="flex  justify-center">
                  <div className="md:flex  hidden md:flex-col">
                    <h2 className="font-bold text-xl mb-2 text-gray-200">
                      MY OTHER PROJECTS
                    </h2>
                    <Link
                      className="text-sm mb-1 hover:text-blue-800 text-blue-500"
                      href="https://elevate-ai-iota.vercel.app/"
                    >
                      &gt; Ankit&apos;s Elevate AI{" "}
                    </Link>
                    <Link
                      className="text-sm mb-1 text-blue-500 hover:text-blue-800"
                      href="https://car-vision.vercel.app/"
                    >
                      &gt; AI Car Market Place
                    </Link>
                    <Link
                             className="text-sm mb-1 text-blue-500 hover:text-blue-800 "
                        href="http://sprint-board-nine.vercel.app/"
                      >
                        &gt; Sprint Board
                      </Link>
                       <Link
                        className="text-sm mb-1 text-blue-500 hover:text-blue-800 "
                        href="https://ai-finance-management-seven.vercel.app/"
                      >
                        &gt; AI Finance Management
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
  )
}

export default Footer