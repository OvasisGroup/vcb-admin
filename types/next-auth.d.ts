
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
      user : {
        id: string;
        userId: string;
        roles?: string[];
        adminName: string;
        email: string;
        firstLogin: boolean;
        accountLocked: boolean;
        sessionId: string;
        sessionExpirationTime: Date;
        access_token: string | null,
        accountLocked: string
    };
    expires: string;
}
  interface User {
    id: string;
    userId: string;
    roles: string[];
    adminName: string;
    email: string;
    firstLogin: boolean;
    accountLocked: boolean;
    sessionId: string;
    sessionExpirationTime: Date;
    access_token: string,
    accountLocked: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {

      id: string;
      userId: string;
      roles?: string[];
      adminName: string;
      firstLogin: boolean;
      accountLocked: boolean;
      sessionId: string;
      sessionExpirationTime: Date;
      access_token: string | null;
      email: string;
      accountLocked: string;
      expires: string;
      token: string;
      user: User;
  }
}


