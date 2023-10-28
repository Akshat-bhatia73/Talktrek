"use client"

import Button from "@/components/Button"
import { signOut } from "next-auth/react"

const Users = () => {
  return (
    <div>
        <Button type="button" danger onClick={() => signOut()}>Logout</Button>
    </div>
  )
}

export default Users