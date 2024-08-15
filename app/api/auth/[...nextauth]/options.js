import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connect } from "mongoose";
import User from "../../../../../models/user";

connect(process.env.MONGODBURL);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await signInWithCredentials({ email, password });
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/errors",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

async function signInWithCredentials({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Email does not exist!");

  const compare = await bcrypt.compare(password, user.password);

  if (!compare) throw new Error("Password incorrect!");

  return { ...user._doc, _id: user._id.toString() };
}
