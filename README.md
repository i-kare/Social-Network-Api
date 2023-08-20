# Social-Network-Api
# Description
AS A social media startup I WANT an API for my social network that uses a NoSQL database SO THAT my website can handle large amounts of unstructured data

# Acceptance Criteria
- GIVEN a social network API
- WHEN I enter the command to invoke the application
- THEN my server is started and the Mongoose models are synced to the MongoDB database
- WHEN I open API GET routes in Insomnia for users and thoughts
- THEN the data for each of these routes is displayed in a formatted JSON
- WHEN I test API POST, PUT, and DELETE routes in Insomnia
- THEN I am able to successfully create, update, and delete users and thoughts in my database
- WHEN I test API POST and DELETE routes in Insomnia
- THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

# Steps to run app
1. Make sure your mongodb server is running
2. For MacOsX its brew services start mongodb-community or brew services start mongodb
3. Then run npm install
4. Then run npm run start, when it is successful it will state API server is running on port 3001
5. Make some calls
```List of all endpoints
    USER
        Get all users - GET /api/users
        Get user by id - GET /api/users/:userId
        Create a new user - POST /api/users
        Update user by id - PUT /api/users/:userId
        Delete user by id - DELETE /api/user/:userId
    
    FRIEND
        Add friend to a user's friend list - POST /api/users/:userid/friends/:friendId
        Delete friend from a user's friend list - DELETE /api/users/:userid/friends/:friendId
        
    THOUGHT
        Get all thoughts - GET /api/thoughts/
        Get thought by id - GET /api/thoughts/:thoughtId
        Create thought - POST /api/thoughts/
        Update thought by id - PUT /api/thoughts/:thoughtId
        Delete thought by id - DELETE /api/thoughts/:thoughtId
        
    REACTION
        Create reaction - POST /api/thoughts/:thoughtId/reactions
        Delete reaction by reactionId - DEL /api/thoughts/:thoughtId/reactions/:reactionId
```
6. Then ctrl C to close application and make sure to stop mongodb by using command brew services stop mongodb

# Walkthrough Video
1. Video 1 with all working routes, except there's an error in deleteFriend
https://drive.google.com/file/d/1xBkGZwscQPHVpx9mbTfucqd8v2mCaBQ0/view?usp=sharing

2. Video 2 with deleteFriend working
https://drive.google.com/file/d/14jq5RjS6Zwgj4-yVO6GsBXn0JGxJ5Qxb/view?usp=sharing

# References
Regex for email from Module 17 Challenge
