deployed
 # todo:

server running X
eslint config X 

 /////

backend function

crud user

 ////

 - user atributes
   - objectId by mongodb 
   - firstName
   - lastName
   - email
   - password

 /////

 # backend
   - get user by ObjectId X
     - need json web token to get the user data by Id X
     - verify is jwt is valid X
     - dont display the user password X
     - return 'Acess Denied' if jwt is not valid X
   - get user by email X
   - verify password, email are valid X

 - on sign-up
   - verify if user exists X
   - hash password X
   - create user X

 - on sign-in
   - verify if password is correct (compare hashed passwords) X
   - generate json web token on login success X
   - auth user

 - user
   - Update informations X
   - delete user X

# Routes

 ## default route
  - /users

  ### get

    - /:id
     - need jwt
     - return user data except password
    - /:email
     - return user data
     - private route

  ### post 
  
    - /register
     - need the firstName, lastName, email and password properties
     - create user in database
    - /login
     - need email and password
     - returns user ID and jwt token
    
  ### patch

    - /:id
     - need jwt
     - edit user password in database
     - need the email, current password and the new password

  ### delete
    
    - /:id
      - need jwt
      - delete user of database
      - need user ID and password