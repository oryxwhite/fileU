# FileU
## [Live Demo](https://wild-bedclothes-wasp.cyclic.app/)
Test account username: clycictest1, password: pass1234


### A template for MERN projects that require user Authentication and file uploads. 

![](https://raw.githubusercontent.com/oryxwhite/fileU/main/Screenshot_20221215_023826.png)



This app uses:

 - React / Typescript
 - TailwindCSS
 - DaisyUI
 - Node.js
     - Express
     - Multer (middleware for multipart form data) 
     - Passport.js JWT (middleware for authentication)
 - MongoDB
 - AWS S3 Object Storage
 



## Install and configure
- run npm i in root dir and tsclient
- add environment variables in root .env file:
    - S3_BUCKET
    - AWS_ACCESS_KEY
    - AWS_SECRET_ACCESS_KEY
- add environment variable to tsclient .env file:
    - VITE_API_URL
- run generateKeyPair
- npm run dev for development, npm run build for production
