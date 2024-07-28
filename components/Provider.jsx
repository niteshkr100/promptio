"use client"
// it is client side component b/c it uses browser side capabilites

import { SessionProvider } from "next-auth/react"



const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider
