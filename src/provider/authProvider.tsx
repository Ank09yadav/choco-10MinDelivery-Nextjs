"use client"

import { SessionProvider as NextAuthProvider } from "next-auth/react"
import React from "react"

const SessionProvider = ({ children, session}: {children:React.ReactNode, session:any}) => {
    return (
        <NextAuthProvider session={session}>
            {children}
        </NextAuthProvider>
    )
}

export default SessionProvider