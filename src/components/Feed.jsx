import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import firebaseapp from "../firebase-config";
import { categoryFeeds, getAllFeeds } from "../utils/fetchData";
import Spinner from "./Spinner";
import PinVideo from "./PinVideo";
import NotFound from "./NotFound";
import { Grid, Paper, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useSearchValue } from "./context/SearchProvider";





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Feed = () => {
  const db = getFirestore(firebaseapp);
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const { searchText } = useSearchValue();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      categoryFeeds(db, categoryId).then((data) => {
        setFeeds(data);
        setLoading(false);
      });
    } else {
      getAllFeeds(db).then((data) => {
        setFeeds(data);
        setLoading(false);
      });
    }
  }, [categoryId, searchText]);

  if (loading) {
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

  // Filter feeds based on searchText
  const filteredFeeds = feeds
    ? feeds.filter((feed) =>
        feed?.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <Box sx={{ py: 4, width: "100%" }}>
      {filteredFeeds.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 2 }}
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "flex-start",
              md: "flex-start",
            },
            alignItems: "center",
          }}
        >
          {filteredFeeds.map((data, index) => (
            <Grid item key={index}>
              <Item>
                <PinVideo key={data?.id}  data={data} />
              </Item>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NotFound />
        </Box>
      )}
    </Box>
  );
};

export default Feed;
