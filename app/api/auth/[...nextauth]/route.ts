import prisma from "@/app/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { Session } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionStrategy } from "next-auth"
import { JWT } from "next-auth/jwt"
import { signInEmailPassword } from "@/app/auth/actions/auth-actions"

const strategy: SessionStrategy = "jwt"
export const authOptions = {

  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Correo electrónico", type: "email", placeholder: "user@email.com" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
  
        const user = await signInEmailPassword(credentials!.username, credentials!.password)
  
        if (user) {

          return user
        } 

        return null
      }
    })
  ],
  session: {
    strategy
  },

  callbacks: {
    async signIn() {
      return true
    },

    async jwt({ token }: { token: JWT }) {

      const dbuser = await prisma.user.findUnique({ where: { email: token.email ?? 'No email' } })

      if (!dbuser?.isActive) {
        throw Error('User is not active')
      }

      token.roles = dbuser?.roles ?? ['no-roles']
      token.id = dbuser?.id ?? 'no-uuid'

      return token
    },

    async session({ session , token} : { session: Session, token: JWT }) {
      if (session && session.user) {
          session.user.roles = token.roles
          session.user.id = token.id
      }

      return session
    } 
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 