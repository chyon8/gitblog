import User from "@/models/User";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from 'next-auth/providers/github';

export const dynamic = 'force-dynamic'

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: 'read:user repo read:org user:email' } }, 
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const { name, email, image } = user;

      try {
        const userExists = await User.findOne({ email });

        if (!userExists) {
          const res = await fetch(`${process.env.BASE_URL}/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              image
            }),
          });

          if (res.ok) {
            return user;
          }
        }
      } catch (error) {
        console.log(error);
        return false;
      }

      return user;
    },
    async session({ session, token, user }) {
      const userData = await User.findOne({ email: session.user.email });
      if (userData) {
        session.user.id = userData._id;
        session.user.subscribed = userData.subscribed;
        session.user.credits = userData.credits;
        session.user.startTime = userData.startTime
      }
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
