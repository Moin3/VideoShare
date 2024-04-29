import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import Spinner from "./Spinner";
import { getFirestore } from "firebase/firestore";
import firebaseapp from "../firebase-config";
import RecommendedVideo from "./RecommendedVideo";
import { gertUserInfo, userUploadedVideos } from "../utils/fetchData";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const UserProfile = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);

  const db = getFirestore(firebaseapp);

  useEffect(() => {
    setIsLoading(true);
    if (userId) {
      gertUserInfo(db, userId)
        .then((user) => {
          setUserInfo(user);
          return userUploadedVideos(db, userId);
        })
        .then((feed) => {
          setFeeds(feed);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        });
    }
  }, [userId, db]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Spinner msg={"Loading your feeds"} />
      </Box>
    );
  }

  return (
    <Container>
      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box position="relative">
              <img
                src={randomImage}
                alt="cover"
                style={{
                  width: "100%",
                  height: "320px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <img
                src={userInfo?.photoURL}
                alt="profile"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid #f0f0f0",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Box>
            <Grid item xs={12}>
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Username:{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "gray",
                      fontFamily: "Playfair Display",
                    }}
                  >
                    {userInfo?.displayName}
                  </span>
                </Typography>
                <Typography variant="body1">
                  Email:{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Playfair Display",
                    }}
                  >
                    <Link href={`mailto:${userInfo?.email}`}>
                      {userInfo?.email}
                    </Link>
                  </span>
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {feeds && (
            <Grid item xs={12}>
              <Box mt={4}>
                <RecommendedVideo
                  feeds={feeds}
                  xs={"column"}
                  sm={"row"}
                  md={"row"}
                  lg={"row"}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfile;
