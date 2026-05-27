import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUser } from "./services/userServices"
import bcrypt from "bcryptjs"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub]
})