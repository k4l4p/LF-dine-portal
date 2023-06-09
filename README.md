# LFDINE NFT minting portal

1. Copy `.env.example` and rename to `.env.[NODE_ENV]`<br/>
*P.S if `NODE_ENV` is not specified, default loading `.env.local`* 
```
NEXT_PUBLIC_API_ENDPOINT=backend endpoint
NEXT_PUBLIC_CONTRACT_ADDRESS=contract address

```
For vercel deployment, please refer to [this page](https://vercel.com/docs/concepts/projects/environment-variables?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) to set env. variables

2. Add CORS rule on the [backend](https://github.com/varun1508singh/LFdine-backend)
```javascript
const corsOptions = {
  origin: [
    // localhost
    "http://localhost:3000", 
    // ...
    ],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

```
3. Install packages and run

```bash
yarn 
# dev
yarn dev
# build
yarn build
yarn start
```
