// import serviceAccount from "../../firebase-auth-key/blogspot-deba018-firebase-adminsdk-rdtg0-7c6257c18b.json";
// // import * as crypto from "crypto";

// interface DecodedToken {
//   iss: string; // Token issuer
//   aud: string; // Audience
//   auth_time: number; // Authentication time
//   user_id: string; // User ID
//   sub: string; // Subject (user ID)
//   iat: number; // Issued at time
//   exp: number; // Expiration time
//   email?: string; // Optional email
//   email_verified?: boolean; // Optional email verification status
//   firebase: {
//     identities: {
//       [key: string]: string[];
//     };
//     sign_in_provider: string;
//   };
// }

// interface TokenHeader {
//   alg: string;
//   kid: string;
//   typ: string;
// }

// interface VerifiedUserData {
//   userId: string;
//   email?: string;
//   emailVerified?: boolean;
//   authTime: number;
//   issueTime: number;
// }

// interface PublicKeys {
//   [key: string]: string;
// }

// const convertCertificateToPEM = (cert: string): string => {
//   // Remove PEM formatting if it exists
//   cert = cert.replace(/-----BEGIN CERTIFICATE-----/, "");
//   cert = cert.replace(/-----END CERTIFICATE-----/, "");
//   cert = cert.replace(/\s/g, "");

//   // Add PEM formatting
//   const pemHeader = "-----BEGIN CERTIFICATE-----\n";
//   const pemFooter = "\n-----END CERTIFICATE-----";

//   // Insert newlines every 64 characters
//   const matches = cert.match(/.{1,64}/g) || [];
//   const pem = matches.join("\n");

//   return pemHeader + pem + pemFooter;
// };

// const verifyFirebaseToken = async (
//   idToken: string
// ): Promise<VerifiedUserData> => {
//   try {
//     // Get Google's public keys
//     const response = await fetch(
//       "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
//     );
//     const publicKeys: PublicKeys = await response.json();

//     // Decode the token header to get the key ID (kid)
//     const header: TokenHeader = JSON.parse(
//       Buffer.from(idToken.split(".")[0], "base64").toString()
//     );
//     const kid = header.kid;

//     if (!publicKeys[kid]) {
//       throw new Error("Public key not found for this token");
//     }

//     // Create certificate from public key
//     const certificate = publicKeys[kid];

//     // Verify the token using jsonwebtoken
//     const jwt = require("jsonwebtoken");
//     const decodedToken: DecodedToken = jwt.verify(idToken, certificate, {
//       algorithms: ["RS256"],
//       audience: serviceAccount.project_id,
//       issuer: `https://securetoken.google.com/${serviceAccount.project_id}`,
//     });

//     // Additional validations
//     const currentTime = Math.floor(Date.now() / 1000);

//     if (decodedToken.exp < currentTime) {
//       throw new Error("Token has expired");
//     }

//     if (decodedToken.iat > currentTime + 300) {
//       // 5 minutes clock skew allowed
//       throw new Error("Token issued time is in the future");
//     }

//     if (!decodedToken.sub) {
//       throw new Error("Token has no subject (user ID)");
//     }

//     // Return verified user data
//     return {
//       userId: decodedToken.sub,
//       email: decodedToken.email,
//       emailVerified: decodedToken.email_verified,
//       authTime: decodedToken.auth_time,
//       issueTime: decodedToken.iat,
//     };
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Token verification failed: ${error.message}`);
//     }
//     throw new Error("Token verification failed with unknown error");
//   }
// };

// // Usage example
// //   const verifyToken = async (idToken: string): Promise<void> => {
// //     try {
// //       const userData = await verifyFirebaseToken(idToken);
// //       console.log('Verified user:', userData);
// //     } catch (error) {
// //       console.error('Verification failed:', error);
// //     }
// //   };

// export default verifyFirebaseToken;
