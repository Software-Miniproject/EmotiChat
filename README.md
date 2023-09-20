# EmotiChat (https://emoti-chat.netlify.app/)
EmotiChat is a Firebase and React-based online chat web-application that allows users to easily communicate with each other in private chatrooms. The website allows users to login using the Google Authentication API, search for other users to create chatrooms, and read / send messages in a selected chatroom. The website itself is hosted using [Netlify](https://emoti-chat.netlify.app/), and the code is automated using GitHub Actions to publish the most recent push to the link.

## How to Use
To use EmotiChat, you just have to go to the link emoti-chat.netlify.app. From there, you can sign-in using the `Sign in` link on the navigation bar. This lets you create a user using Google User Authentication. From there, you can use the `Search` link to search up existing users on the app to create chatrooms. On the home page, you can select which chatroom to view from the Chatrooms menu, and in the chatroom itself you can view the messages sent to you and send messages back.

<img width="1668" alt="Screen Shot 2023-09-19 at 8 20 38 PM" src="https://github.com/Software-Miniproject/EmotiChat/assets/98369076/586c310a-9438-4cda-b162-dd09ce246ca6">

## React and Firebase
The app itself is written using React as a free, open-source tool for creating mobile and web applications using JavaScript and CSS. The React code connects to Firebase for access to API's like Google Authentication as well as the Firestore storage feature that allows easy setup and querying of a database for the application.

### Firestore
EmotiChat stores and accesses three database containers in Firestore: users, chats, and messages.

#### Users
The 'users' collection contains the information of existing users: username, id, email, name, pfp link, and an array of chatroom id's to tell which chatrooms the user is currently in.

#### Messages
The 'messages' collection contains all of the messages sent across the entire application. Each document contains: the message contents, the id of the sender, the timestamp of when the message was sent, and the id of the chatroom it took place in.

#### Chats
The 'chats' collection contains all of the chats on the app. Each chat only needs to store its id.

## Authentication / Authorization / Accounting

<img width="1199" alt="Screenshot 2023-09-19 202049" src="https://github.com/Software-Miniproject/EmotiChat/assets/91096079/2e163304-2270-4234-9ebf-5b719e634584">

Before being able to use any of the features of EmotiChat, you must sign in with your Google account. The sign in page is the only accessible page when you are not signed in. Any attempt to navigate to another page will take you back to the sign in page. When you click the "Sign in with Google" button, you are redirected to the Google sign in page where you can sign in with your Google account (or, you will be immediately signed in if you are already signed in on Google in your current browser).

After signing in, you are taken to the home page, and the Navbar now indicates the user that you are signed in as, and contains links to your account page, and the search page. Clicking the "EmotiChat" link takes you to the home page. There is also "Sign Out" button that you can use the sign out of your account from any page at any time.

<img width="1199" alt="Screenshot 2023-09-19 202417" src="https://github.com/Software-Miniproject/EmotiChat/assets/91096079/547709d2-356e-487c-9d04-e82010b67164">

Clicking the "My Account" link takes you to your account page. Your account page displays your profile picture, name, username, and email that you signed in with. This information is gathered from your google account when you sign in to EmotiChat for the first time, with your username being taken from your email prefix. There is also a "Sign Out" button on the account page that you can also use to sign out. Clicking the "Change" link nexts to your username takes you to the username change page.

<img width="1196" alt="Screenshot 2023-09-19 202525" src="https://github.com/Software-Miniproject/EmotiChat/assets/91096079/50321fe1-22d0-4f4c-9d16-5202b50de366">

On the username change page, you can enter a desired username that you would like to change to and save it to your account. However, there are some filters and limitations to the username you set for yourself. In terms of formatting, your username can only contain letters, numbers, the "." and "_" symbols, and must be between 3 to 30 characters in length. Entering in anything that does not fit this formatting will immediately cause an error message to display that states the requirements, and it will not be saved to your account.

<img width="634" alt="Screenshot 2023-09-19 202619" src="https://github.com/Software-Miniproject/EmotiChat/assets/91096079/474469c2-65df-4852-a4ec-b7ff3392aaf6">

Additionally, your username cannot be the same as another user's. When you attempt to save your username as one that another Emotichat user is using, an error message will be displayed stating that the username is already in use, and it will not be saved to your account.

<img width="1196" alt="Screenshot 2023-09-19 202723" src="https://github.com/Software-Miniproject/EmotiChat/assets/91096079/6173ecd9-0d58-4bfc-a1b8-a27375f0f692">

If the username you enter fits the formatting requirements and is not already being used, you will successfully be able to save it to your account and a success message will be displayed stating that your username was changed.

## Search Function
The search function takes an input from the user and stores it which is then passed to the query search which outputs any value "greater than or equal to" the input. The results are displayed alphabetically. This means that anything after or equal to the input will be displayed. The results are read from the Cloud Firestore where the information of the users is grabbed and displayed in a table. The search occurs only after the search button is pressed. There is also a select box where the user can select which field they are searching. The options available are username, name, and email. When the search button is pressed without input, all users will be displayed in the same alphabetical way. Along with that, the search is case-sensitive.

To use the search function, select the desired search type: username, name, or email. Then, select the search bar and type the search into the bar. From there, press the search button to submit the search. Once pressed, the results will be displayed.

![image](https://github.com/Software-Miniproject/EmotiChat/assets/91104705/1590cc1d-ae59-4535-8d9c-327abc25d2d2)

## Start Chat Link
The start chat link is incorporated with the search page. After searching for the desired user to chat with, the link will create a chatroom with that other user and bring the user to the chatroom/home page. This allows the user to send the receiver a message more easily. This is done through a series of linking and creation of chatrooms and their messages into the Cloud Firestore.

## Chatroom Display
The way that the chatroom display works is that the DisplayChatrooms.js component checks if the user is currently logged in (if not, wait for a change in the state of auth.currentUser to refresh). The component then queries into Firestore for all of the chat id's stored in the user's `chatrooms` array. It then displays each of these chatrooms as buttons that the user can click on to select that chatroom as the current chatroom.

## Messaging
EmotiChat uses the id of the currently selected chatroom to display the id of the selected chatroom at the top and display all of the messages in Firestore associated with that id ordered by the timestamps of when each message was sent. If the id of the message sender is the same as the user currently logged in, the message will appear green on the right, and otherwise it will appear grey on the left of the chatroom.

This component also allows the user to send messages in a submit bar at the bottom of the chatroom. Upon submission, React creates a document under the `messages` collection that stores the message's contents, timestamp, the chatroom id, and the id of the current user who sent it.

## GitHub Actions
GitHub Actions is connected to Netlify. Upon each push, GitHub Actions connects to Netlify, builds the website using `npm run build`, then publishes the built code to Netlify so that the hosted website is constantly up to date with the most recent functioning commit.

Sources: 
https://javascript.works-hub.com/learn/how-to-create-a-ci-slash-cd-pipeline-using-netlify-and-github-actions-90aeb
https://www.youtube.com/watch?v=zQyrwxMPm88&feature=youtu.be

