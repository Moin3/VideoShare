
# VidShare - A Video Sharing Platform

Welcome to VidShare – your go-to platform for sharing and discovering amazing videos! VidShare is designed to empower users to upload their unique content and connect with an audience that loves engaging with diverse and creative videos. Whether you're a content creator eager to share your work or a viewer looking for new and exciting videos, VidShare offers a seamless and enjoyable experience.

## Live Link
[https://vid-share.vercel.app/](https://vid-share.vercel.app/)


## Features: 
- `User Registration with Google Authentication:` Easily create an account using Google authentication powered by Firebase, ensuring a secure and quick registration process.

- `Video Upload:` Share your videos with the world in just a few clicks. Our platform supports a variety of video formats to make the upload process smooth and hassle-free.
- `Discover Content:` Browse through an extensive library of videos uploaded by other users. Our intuitive recommendation system helps you find content that matches your interests.
- `Search Functionality:` Easily search for specific videos
- `Category Filtering:` Filter videos through various categories to find the exact type of content you're interested in.

## Installation



```bash
  git clone https://github.com/dev-moinislam/VideoShare.git
  cd VideoShare
  npm install
```
    
## Development

To run this project on development server  

```bash
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_DATABASE_URL`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`



## Tech Stack

**Client:** ReactJs, Context API, MUI, React Jodit Editor

**Server:** Firebase

**Database:** Firebase Firestore


## Dependencies
```json
 "dependencies": {
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@mui/icons-material": "^5.11.0",
    "@mui/material": "^5.11.7",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^13.0.0",
    "@testing-library/user-event": "^13.2.1",
    "dotenv": "^16.0.3",
    "firebase": "^9.16.0",
    "html-react-parser": "^5.1.10",
    "jodit-react": "^1.3.35",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^4.7.1",
    "react-loader-spinner": "^5.3.4",
    "react-player": "^2.16.0",
    "react-router-dom": "^6.8.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.0"
  },
  ```



## Contributing

Pull requests are welcome! Feel free to modify or extend VidShare's functionalities based on your needs.

