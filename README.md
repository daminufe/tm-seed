# Eurus

### Creating admin user

    gulp seed --email my@email.com

or

    gulp seed:admin --email my@email.com


### Requesting access token

    POST /api/auth
    {
        "grant_type": "password",
        "username": "username",
        "password": "password" 
    }

Responses:

    // 401 Unauthorized
    {
        "error": "Invalid credentials"
    }

    // 200 Grant access
    {
      "token_type": "bearer",
      "access_token": "hash-here",
      "refresh_token": "hash-here",
      "expires_in": 3600,
      "user": {
        //...
      }
    }

### Refreshing token 

    POST /api/auth
    {
        "grant_type": "refresh_token",
        "refresh_token": "my-refresh-token"
    }

Responses:

    // 401 Unauthorized
    {
        "error": "Invalid token"
    }

    // 200 Grant access
    {
      "token_type": "bearer",
      "access_token": "hash-here",
      "refresh_token": "hash-here",
      "expires_in": 3600,
      "user": {
        //...
      }
    }
