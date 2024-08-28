// // @ts-nocheck
// import { PineconeClient } from '@pinecone-database/pinecone';

// if (!import.meta.env.VITE_PINECONE_ENVIRONMENT || !import.meta.env.VITE_PINECONE_API_KEY ) {
//   throw new Error('Pinecone environment or api key vars missing');
// }

// async function initPinecone() {
//   try {
//     const pinecone = new PineconeClient();

//     await pinecone.init({
//       environment: import.meta.env.VITE_PINECONE_ENVIRONMENT, //this is in the dashboard
//       apiKey: import.meta.env.VITE_PINECONE_API_KEY,
//     });

//     return pinecone;
//   } catch (error) {
//     console.log('error', error);
//     throw new Error('Failed to initialize Pinecone Client');
//   }
// }

// export const pinecone = await initPinecone();
