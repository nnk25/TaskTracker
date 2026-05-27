import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    authorize: async (credentials) => {
                if(!credentials?.username || !credentials?.password) return null
                const {username, password} = credentials as {username: string, password: string}
              
                const user = await getUser(username)
                console.log(user)
                return user
            }

  })]
  
})