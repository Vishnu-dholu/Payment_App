import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

const JWT_SECRET = process.env.JWT_SECRET || "";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const credentialsSchema = z.object({
  phone: z.string().regex(/^\d+$/, "Phone must be a number").length(10),
  password: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
        // email: { label: "Email", type: "text", placeholder: "you@example.com" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        try {
          const { phone, password, name } =
            credentialsSchema.parse(credentials);
          const existingUser = await db.user.findFirst({
            where: {
              number: phone,
              name,
            },
          });

          if (existingUser) {
            const passwordValidation = await bcrypt.compare(
              password,
              existingUser.password
            );
            if (passwordValidation) {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                // number: existingUser.number,
                // email: existingUser.email,
              };
            }
            return null;
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await db.user.create({
            data: {
              number: phone,
              password: hashedPassword,
              email: `${name}@gmail.com`,
              name,
            },
          });
          return {
            id: newUser.id.toString(),
            number: newUser.number,
            name: newUser.name,
            email: newUser.email,
          };
        } catch (e) {
          console.error("Error during authorization:", e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: JWT_SECRET,
  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }) {
      if (session.user) {
        session.user.id = token.sub || "";
      }
      return session;
    },
  },
};

export default (req: any, res: any) => NextAuth(req, res, authOptions);
