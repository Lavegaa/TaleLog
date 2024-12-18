import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      // Google이 인증 후 authorization code를 제공
      console.log('account', account);
      const idToken = account?.id_token;
      const token = 'test';
      // 이 코드를 우리 서버로 전달
      const response = await fetch('http://localhost:4000/v1/auth/google/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idToken: idToken }),
      });
      console.log('response', response);
      return true;
    },
  },
});

export { handler as GET, handler as POST };
