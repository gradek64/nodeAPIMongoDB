this is node api using MongoDB with mongoose client to work with DB.
it is custom excpept for modules needed for JSON token and encrypting passwords.
bcrypt is used for encrypting 
jsonwebtoken is used for creating/decoding/using JSON token.

The proccess is to create user, sign in and then use JSON token to CRUD all api/post routes 
open routes are api/users/create , api/users/signin (returns token) , api/users , api/users/:userId
the rest of routes needs token send in request in header Authorization 'Bearer xxx.token'
