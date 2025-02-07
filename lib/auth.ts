
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from "next-auth";
import axios from 'axios';
import { getSession } from "next-auth/react";


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: { label: 'userId', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.NEXTAUTH_URL_API}/authentication/admin/login`,{
            userId: credentials?.userId,
            password: credentials?.password
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Client-Type': 'WEB',
            }
          }
        );
          
          // console.log("Login Response at",response.data);
          const user = response.data;

          if (response.status === 200) {
            // console.log("Main User", user)
            const roles = user.body.roles;
            const userId = user.body.userId;
            const adminName = user.body.adminName;
            const email = user.body.email;
            const firstLogin = user.body.firstLogin;
            const sessionId = user.body.sessionId;
            const sessionExpirationTime = user.body.sessionExpirationTime;
            const access_token = user.body.access_token;
            return Promise.resolve({ ...user, roles, userId, adminName, email, firstLogin, sessionId, sessionExpirationTime, access_token });
          } else {
            return Promise.reject(new Error('Invalid credentials'));
          }
        } catch (error) {
          // console.error('Login error:', error);
          return Promise.resolve(null);
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        token.userId = token.userId
        token.adminName = user.adminName;
        token.email = user.email;
        token.roles = user.roles;
        token.firstLogin = user.firstLogin;
        token.sessionId = user.sessionId;
        token.sessionExpirationTime = user.sessionExpirationTime; 
        token.access_token = user.access_token;
      }

      // console.log("my token", {token, user})
      return token
  },
    async session({ session, token }) {
      // console.log("my session callback",{session, token});
      session.user = {
        ...session.user,
        userId: token.userId,
        adminName: token.adminName,
        email: token.email,
        roles: token.roles,
        firstLogin: token.firstLogin,
        sessionId: token.sessionId,
        sessionExpirationTime: token.sessionExpirationTime,
        access_token: token.access_token,
      }
      return session;
  },
  
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    }
  },
  pages: {
    signIn: "/"
  },

  };

