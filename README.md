# Mass_News_Feed
This project is done for Web Tech Hackathon 2021

# Details
This a news feed where a user can upload a post with captions,as well as vote on any posts. Only verified users are allowed to post or vote a picture while others will just be 
able to view it. The goal to work on this project is to create a community where others can connect on by sharing their artworks and update.

-->VIDEO LINK--->https://drive.google.com/drive/folders/10MulHHagQgCN4uqBDPbmsObZISwQEpfc?usp=sharing

# Breakdown
Client--> The client side is mainly handled by react js.
          Used following features :
          a)Context Api which works like a data layer to avoid prop drilling in react
          b)Styled Components
          c)React Router Dom to create new page and link with them
          d)Moment JS is used to manipulate the timestamp into a more desired version
          e)Axios is used to make http (post/get) request to the rest api on the node server
          
Server--> The server side is handled by node js.
          Used following feature:
          a) Express
          b) Multer for file uploads
          c) Sessions and cookies for user authentication
          d) Mysql database connections to work with different queries
          
 # Current Status
 -->Good
 
 -->I have used clean coding on the client side but as I am quite new on working with node js I could not keep it clean. I will soon work on it.
 
 # Bugs
 None
 
 # Future Plans
 
 --> Want to implement JWT for better authentication for users
 --> Will implement React Redux to control the states
 --> Will implement the option for authorized users to make comments on any post which can be viewed by all the other users
 -->Will upgrade the user interface to be more user friendly
 -->Want to upload the images on a cloud platform and connect the database with it.
 
 
