## Authentication System

### Client-Server

Server side session based authentication system is used for verifying identity
of the user.

For speed & scalability redis is used for maintaining sessions.

### Server-Server

JWT based authentication mechanism is to be used for server to server communication.

## FAQs :

#### How can I use JWT based authentication on Client-Server communication ?

    > You can find functions to create, verify, decode JWT in helpers/auth_functions/jwt_functions. Please feel free to use them to implement
    the authentication system of your choice.

#### Why server-side-session based authentication is used for Client-Server communication ?

    > There are several reasons to use & not to use both JWTs & Server-based-sessions.

    Server-based-sessions are used here because of :

    - To keep request payload low, reducing network bandwith needed, thus faster
    request traversal.
    - Relatively easy to implement.
    - Easily revokable sessions.

    While JWT based authentication is used for Server-Server communication because of :

    - Small size of not-allowed-list (blacklist) to maintain, if any
        _(this list grows huge in case of Client-Server architecture)_
    - Easy to revoke & maintain at backend, by handling the private key
    - Low impact on the whole architecture in case of key change
