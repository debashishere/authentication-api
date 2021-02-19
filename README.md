# A Secure authentication-api 
![Image of Yaktocat](https://github.com/debashishere/authentication-api/blob/main/Idea/flow.jpg)
<hr>

## Register/Create a new use
You can Register a user by sending an HTTP POST request to the signup URI with necessary details in req.body as follows:

### Request

POST /api/auth/signup<br>
req.body = {
             userName,
             email,
             password,
             confromPassword
           }
           
### Response
{<br>
    "message": "User Registered Successfully!", <br>
    "data": {<br>
        "user": {<br>
            "userName": "userName",<br>
            "email": "useremail@gmail.com"<br>
        },<br>
        "token":<br> "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJmNjRmZWRjNjc4YzEyMDA1YzlmOGMiLCJ1c2VyTmFtZSI6ImF1dGhtZSIsImVtYWlsIjoic2RmZ2Zkc2dkZkBnbWFpbC5jb20iLCJpYXQiOjE2MTM3MTg3ODIsImV4cCI6MTYxMzgwNTE4MiwiYXVkIjoidGhpcmRwYXJ0cnkiLCJpc3MiOiJNeUFwcCIsInN1YiI6ImF1dGhlbnRpY2F0aW9uV2l0aGp3dCJ9.LeFqSLYyQooOYCERbLhA5UxFLBecuUSjLtzRAH5_Qh7E4TE3dRtp4BuluNbv498njrEG-pxMKr9aRBQX5Zhvog"<br>
    }<br>
}<br>


## Login a user
You can login a user by sending an HTTP POST request to the login URI with email and password in req.body as follows:

### Request

POST /api/auth/login<br>
req.body = {
             email,
             password
           }
           
### Response
{ <br>
    "message": "save the token for future request",<br>
    "token":<br> "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJmNGYxM2M1OWY0ODFiZDRhYzdkYTYiLCJ1c2VyTmFtZSI6ImF1dGhtZSIsImVtYWlsIjoiYXV0aG1lQGdtYWlsLmNvbSIsImlhdCI6MTYxMzcxOTEzNywiZXhwIjoxNjEzODA1NTM3LCJhdWQiOiJ0aGlyZHBhcnRyeSIsImlzcyI6Ik15QXBwIiwic3ViIjoiYXV0aGVudGljYXRpb25XaXRoand0In0.KtmZhMAhmaWt9iUX4yd4XDclUIIApm23RUnBwe0M6rkOc77ZeulsNwnJPddoIDBg2VVt1KljKvCRd0eQBukVgw"<br>
}<br>


## Protected Route
### Request

POST /protected<br>
Authorization Header: Bearer Token<jwt>
           
### Response
{ <br>
    "message": "You are now authenticated",<br>
    "user": {<br>
        "userName": "userName",<br>
        "email": "useremail@gmail.com",<br>
        "createdAt": "2021-02-19T07:13:02.027Z",<br>
        "updatedAt": "2021-02-19T07:13:02.027Z"<br>
    }<br>
}<br>
<hr>

## Technologies
- Node.js
- Express.js
- Passport.js
- MongoDb
- Postman


## Features
- Secure authentication using Token, Encrypted with RSA private keypair.
- User Login / Signup to get token, tokens can be validated in application server with public key.
- Protected route to test if the application working.
