import NextAuth,{DefaultSession} from "next-auth"
//next auth uses jwt tokens by default
declare module "next-auth" {

  interface Session {
    user: {
      if: string
    } & DefaultSession["user"]
  }
}