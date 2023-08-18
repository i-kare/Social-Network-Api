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
5. Make some calls to the following endpoints TODO
6. Then ctrl C to close application and make sure to stop mongodb by using command brew services stop mongodb

# Walkthrough Video

# References
Regex for email from Module 17 Challenge
