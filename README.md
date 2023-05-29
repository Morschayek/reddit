# frameworks and tools I used :
1. for my server i used express framework 
2. for the frontend i used css and html 

# Instructions on how to launch your application locally :
1. clone this repo 
2. run: `npm install`
3. run: `node index.js`

Now you can go to your chrome and insert the following url: localhost:3000

# An overview of how my application works :
1. index.html file acts as a bridge between the server and the client, allowing me to retrieve data from the server and display it to the user. Inside the index.html file, I define the structure and content of my web page using HTML elements. These elements allow me to create a logical layout and organize my content effectively. To make my web page visually appealing and styled, I utilize the style.css file. In this file, I define CSS rules and selectors that target specific HTML elements. To establish the connection between the index.html file and the style.css file, I use the <link> tag within the <head> section of my HTML file. By separating the structure and content (HTML) from the visual design (CSS), I can maintain a clear and organized codebase. The HTML file focuses on defining the layout and content structure, while the CSS file handles the presentation and styling aspects.
2. The backend of my web application is responsible for handling API requests to the Reddit API. When a user interacts with my web page and make a search for a subreddit, the backend receives that request. It then communicates with the Reddit API to retrieve the necessary data. In the event of an error, the backend determines the appropriate error message to send back to the client. It can analyze the error response from the Reddit API and extract relevant details such as the error message and the reason for the error. The index.js file is handling API requests, managing errors, and determining appropriate responses, this ensures a good interaction between the client and the Reddit API. It is an important part in processing and presenting data to the user.


