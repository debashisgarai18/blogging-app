import { Context, Next } from "hono";
import { verify } from "hono/jwt";
// import admin, { ServiceAccount } from 'firebase-admin'
// import jwt from 'jsonwebtoken'
// import serviceAccount from "../../firebase-auth-key/blogspot-deba018-firebase-adminsdk-rdtg0-7c6257c18b.json"
// import verifyFirebaseToken from "../firebase/verifyToken";

// initialize the google auth
// admin.initializeApp({
//   credential : admin.credential.cert(serviceAccount as ServiceAccount),
//   projectId : serviceAccount.project_id
// })

// const GOOGLE_PUBLIC_KEYS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

// async function getFirebasePublicKeys(): Promise<{ [key: string]: string }> {
//   const response = await fetch(GOOGLE_PUBLIC_KEYS_URL);
//   if (!response.ok) {
//     throw new Error('Failed to fetch Firebase public keys');
//   }
//   return response.json();
// }

// async function verifyFirebaseToken(token: string): Promise<any> {
//   const keys = await getFirebasePublicKeys();
//   const decodedHeader: any = jwt.decode(token, { complete: true });

//   if (!decodedHeader || !decodedHeader.header.kid || !keys[decodedHeader.header.kid]) {
//     throw new Error('Invalid Firebase token');
//   }

//   const publicKey = keys[decodedHeader.header.kid];
//   return jwt.verify(token, publicKey, {
//     algorithms: ['RS256'],
//     audience: serviceAccount.project_id,
//     issuer: `https://securetoken.google.com/${serviceAccount.project_id}`,
//   });
// }

// todo : also verify the jwt token received from the google auth using admin verify token
const AuthMiddleware = async (c: Context, next: Next) => {
  const header: string | undefined = c.req.header("Authorization");

  // checking whether the header is empty or not
  if (!header) {
    c.status(404);
    return c.json({
      message: "The auth header is not provided",
    });
  }

  const token = header.split(" ")[1];
  if(!token){
    c.status(404);
    return c.json({
      message : "The token is not provided"
    })
  }
  try {
    // here we need to check the google firebase auth
    // const decodedFirebaseResponse = await admin.auth().verifyIdToken(token);
    // const decodedFirebaseResponse = await verifyFirebaseToken(token)
    // console.log(token)
    // console.log(decodedFirebaseResponse)
    // c.set("userId", decodedFirebaseResponse.userId)
    // await next()
    // if firebase auth fails then it should move to the jwt verify
    const response = await verify(token, c.env.JWT_SECRET);
    if (response) {
      // passing the user id to the blogRoute so that it can be used by the blogs
      c.set("userId", response.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "Error : Unauthorized",
      });
    }
  } catch (err) {
    c.status(404)
    return c.json({
      message : `Some Error : ${err}`
    })
  }
};

export default AuthMiddleware;
