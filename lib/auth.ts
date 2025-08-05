import NextAuth, {  Session, User } from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import { SignInSchema, SignUpSchema, SignUpSchemaType } from "./schemas";
import { z } from 'zod';
import { prisma } from "./prisma";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {

  interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: string;
    };
    refreshedAt?: string;
  }
  
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    credentials: {
      email: {},
      password: {}
    },
    authorize: async (credentials) => { 
      const parsedCredentials = SignInSchema.safeParse(credentials);

      if (!parsedCredentials.success) { 
        console.log("Invalid credential format");
        return null;
      }

      const { email, password } = parsedCredentials.data;

      try {

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (!user) {
          console.log("User not found.");
          return null;
        }

        const passwordMatch = await verifyPassword(password, user.password!);

        if (!passwordMatch) { 
          console.log("Password do not match.");
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
        
      } catch (error) {
        console.log("Error finding user: ", error);
        return null;
      }

    }
  })],
  callbacks: {
    async jwt({ token, user }: { token: JWT ; user: User}) { 

      if (user) { 
        token.id = user.id;
        token.role = user.role;
      }

      return token;

    },
    async session({ session, token }: { session: Session; token: JWT }) { 

      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;

    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  }
})


export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
