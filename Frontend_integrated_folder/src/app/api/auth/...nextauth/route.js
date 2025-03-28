import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Configuration options for authentication
export const authOptions = {
  providers: [
    // Google authentication provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Google Client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret from environment variables
    }),

    // Facebook authentication provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID, // Facebook Client ID from environment variables
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET, // Facebook Client Secret from environment variables
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Secret key for NextAuth authentication
};

// Creating an authentication handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // Exporting the handler for GET and POST requests
