"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {getProviders, signIn, signOut, useSession} from 'next-auth/react'

const Nav = () => {

//  const isUserLoggedIn = true;
const {data: session} = useSession();


 const [providers, setProviders] = useState(null);
 const [toggleDropdown, setToggleDropdown] = useState(false)

 useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
     <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image 
            src="/assets/images/logo.svg"
            width={30}
            height={30}
            className='object-contain'
            />
            <p className='logo_text'>Promptio</p>
        </Link>

         {/* {alert(session?.user)} */}
        {/*  Desktop navigation */}
        <div className='sm:flex hidden'>
        {session?.user ? 
        (<div className='flex gap-2 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
                create post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out
            </button>

            <Link href="/profile">
            <Image
                src={session?.user.image}
                width={40}
                height={40}
                alt='profile'
                className='rounded-full'
               
            />
            
            </Link>
        </div>):
        (<>
        {providers && Object.values(providers).map((provider)=>(
            <button
            type='button'
            key={provider.name}
            onClick={()=> signIn(provider.id)}
            className='black_btn'
            >
            sign In
            </button>
        ))}
        </>
         )} 
        </div>


        {/* mobile navigation */}
        <div className='sm:hidden flex relative'>
        {session?.user ? 
        (<div className='flex'>
            <Image
                src={session?.user.image}
                width={40}
                height={40}
                alt='profile'
                className='rounded-full'
                onClick={()=> setToggleDropdown((prev)=> !prev)}
            />
            {/* Dropdown */}
            { toggleDropdown &&
                <div className='dropdown'>
                     <Link
                     href="/profile"
                     className='dropdown_link'
                     onClick={()=> setToggleDropdown(false)}
                     >
                     Myprofile
                     </Link>
                     <Link
                     href="/create-prompt"
                     className='dropdown_link'
                     onClick={()=> setToggleDropdown(false)}
                     >
                      Create Prompt
                     </Link>
                     <button
                     type='button' 
                     onClick={()=>{ setToggleDropdown(false); signOut();}}
                     className="mt-5 w-full black_btn"
                     >
                     Sign Out
                     </button>
                </div>
            }
        </div>):
        (<>
        {providers && Object.values(providers).map((provider)=>(
            <button
            type='button'
            key={providers.name}
            onClick={()=> signIn(provider.id)}
            className='black_btn'
            >
            sign In
            </button>
        ))}
        </>
         )}
             
        </div>
     </nav>
  )
}

export default Nav
