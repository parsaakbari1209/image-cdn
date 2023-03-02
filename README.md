## How to run
Run the following commands to start the app on `127.0.0.1:8080`:
```
git clone git@github.com:parsaakbari1209/image-cdn.git
npm install
npm run dev
```

## How to deploy
Run the following command to deploy the app on Cloudflare:
```
npm run deploy
```

## Endpoints
```text
GET    /images/:key
PUT    /images/:key
DELETE /images/:key
```

#### Retrieve an image:
```text
curl -o output.jpeg -X GET 127.0.0.1:8080/images/input.jpeg
```

#### Create an image:
```text
curl -X PUT --form 'image=@"input.jpeg"' 127.0.0.1:8080/images/input.jpeg
```

#### Delete an image:
```text
curl -X DELETE 127.0.0.1:8080/images/input.jpeg
```
