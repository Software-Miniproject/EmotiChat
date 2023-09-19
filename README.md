# EmotiChat (https://emoti-chat.netlify.app/)
EmotiChat is a Firebase and React-based online chat web-application that allows users to easily communicate with each other in private chatrooms. The website allows users to login using the Google Authentication API, search for other users to create chatrooms, and read / send messages in a selected chatroom. The website itself is hosted using [Netlify](https://emoti-chat.netlify.app/), and the code is automated using GitHub Actions to publish the most recent push to the link.

## How to Use
To use EmotiChat, you just have to go to the link emoti-chat.netlify.app. From there, you can sign-in using the `Sign in` link on the navigation bar. This lets you create a user using Google User Authentication. From there, you can use the `Search` link to search up existing users on the app to create chatrooms. On the home page, you can select which chatroom to view from the Chatrooms menu, and in the chatroom itself you can view the messages sent to you and send messages back.

<img width="1670" alt="Screen Shot 2023-09-19 at 6 24 52 PM" src="https://github.com/Software-Miniproject/EmotiChat/assets/98369076/8bcb4a5b-092a-4598-90c9-3d65256b260a">

## React and Firebase
The app itself is written using React as a free, open-source tool for creating mobile and web applications using JavaScript and CSS. The React code connects to Firebase for access to API's like Google Authentication as well as the Firestore storage feature that allows easy setup and querying of a database for the application.

### Firestore
EmotiChat stores and accesses three database containers in Firestore: users, chats, and messages.

#### Users
The 'users' collection contains the information of existing users: username, id, email, name, pfp link, and an array of chatroom id's to tell which chatrooms the user is currently in

#### Messages
The 'messages' collection contains all of the messages sent across the entire application. Each document contains: the message contents, the id of the sender, the timestamp of when the message was sent, and the id of the chatroom it took place in

#### Chats
The 'chats' collection contains all of the chats on the app. Each chat only needs to store its id

## Authentication / Authorization / Auditing

## Search Function

## Chatroom Display
The way that the chatroom display works is that the DisplayChatrooms.js component checks if the user is currently logged in (if not, wait for a change in the state of auth.currentUser to refresh). The component then queries into Firestore for all of the chat id's stored in the user's `chatrooms` array. It then displays each of these chatrooms as buttons that the user can click on to select that chatroom as the current chatroom

## Messaging
EmotiChat uses the id of the currently selected chatroom to display the id of the selected chatroom at the top and display all of the messages in Firestore associated with that id ordered by the timestamps of when each message was sent. If the id of the message sender is the same as the user currently logged in, the message will appear green on the right, and otherwise it will appear grey on the left of the chatroom.

This component also allows the user to send messages in a submit bar at the bottom of the chatroom. Upon submission, React creates a document under the `messages` collection that stores the message's contents, timestamp, the chatroom id, and the id of the current user who sent it.

## GitHub Actions
GitHub Actions is connected to Netlify. Upon each push, GitHub Actions connects to Netlify, builds the website using `npm run build`, then publishes the built code to Netlify so that the hosted website is constantly up to date with the most recent functioning commit.

Sources: 
https://javascript.works-hub.com/learn/how-to-create-a-ci-slash-cd-pipeline-using-netlify-and-github-actions-90aeb

