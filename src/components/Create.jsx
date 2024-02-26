import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { categories } from '../data'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import QueueIcon from '@mui/icons-material/Queue';
import Spinner from './Spinner';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AlertMessage from './AlertMessage';
import JoditEditor from 'jodit-react';

import { fetchUser } from "../utils/fetchUser";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import {getStorage,ref,uploadBytesResumable,getDownloadURL,deleteObject} from 'firebase/storage'
import firebaseapp from '../firebase-config'


const Create = () => {

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const [title,setTitle]=useState('')
    const [category, setCategory] = useState('Select a Catagory')
    const [location,setLocation]=useState('')
    const [videoAsset, setVideoAsset] = useState(null)
    const [loading, setLoading] = useState(false)
    const [progressState, setProgressState] = useState(1)
    const [alert, setAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [userInfo] = fetchUser();
    const navigate = useNavigate();

    const storage=getStorage(firebaseapp)
    const db = getFirestore(firebaseapp);


    
        
    // Uploade Video

    const uploadImg=(e)=>{
        // console.log(e.target.files[0])
        setLoading(true)
        const videoFile=e.target.files[0]
        const storageRef=ref(storage,`videos/${Date.now()}-${videoFile.name}`)

        const uploadTask=uploadBytesResumable(storageRef,videoFile)

        uploadTask.on('state_changed', 
            (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressState(uploadProgress)
    
  }, 
  (error) => {
    console.log(error)
  },() => {

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setVideoAsset(downloadURL)
        setLoading(false)
        setAlert(true);
        setAlertStatus("success");
        setAlertMsg("Video Successfully Uploded");
        setTimeout(() => {
        setAlert(false);
        }, 4000);
    });
  })
    }

    // Delete Video

    const dltVideo=()=>{
        const deleteRef=ref(storage,videoAsset)

        deleteObject(deleteRef).then(() => {
            setVideoAsset(null)
            setAlert(true);
            setAlertStatus("error");
            setAlertMsg("Video is deleted");
            setTimeout(() => {
            setAlert(false);
            }, 4000);
          }).catch((error) => {
            console.log(error)
          });
    }

    const uploadDetails=async()=>{
        try{
            setLoading(true)
            if (!title && !category && !videoAsset) {
                setAlert(true);
                setAlertStatus("error");
                setAlertMsg("Fill this empty field");
                setTimeout(() => {
                  setAlert(false);
                }, 4000);
                setLoading(false);
              } else {
                const data = {
                  id: `${Date.now()}`,
                  title: title,
                  userId: userInfo?.uid,
                  category: category,
                  location: location,
                  videoUrl: videoAsset,
                  content: content,
                };
        
                await setDoc(doc(db, "videos", `${Date.now()}`), data);
                setLoading(false);
                navigate("/", { replace: true });
              }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        
    },[title,category,location,content,])


  return (
    <Box
    sx={{
        width:"90%",
        height:'700px',
        border:'1px solid gray',
        borderRadius:'5px',
        marginTop:'20px',
        marginBottom:'20px',
       
       

    }}
  >
        {alert && (
            <AlertMessage status={alertStatus} msg={alertMsg}  />
        )}
    
        <Box >
        <TextField id="filled-basic" label="Title" variant="filled" value={title} onChange={(e)=>setTitle(e.target.value)} fullWidth type='text'/>
        <Stack direction="row" spacing={5} sx={{mt:3 ,display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
            <Box sx={{ minWidth:'250px'}}>
            <FormControl sx={{  m: 1,width:'100%'}} size="small">
                <InputLabel id="demo-select-small">{category}</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label={category}
                    value={category}
                    
                >
                    {categories && categories.map(data=>(
                        <MenuItem key={data.id} 
                            onClick={()=>setCategory(data.name)}
                            value={data.name}
                        >
                            {data.name}
                        </MenuItem>
                    ))}
                    
                </Select>
            </FormControl>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center',minWidth:'250px',mr:2 }}>
                
                <TextField id="outlined-basic" 
                label={<LocationOnOutlinedIcon 
                sx={{ color: 'action.active', mr: 1, }} 
                /> } placeholder='Location'
                variant="outlined" size="small" 
                type='text' value={location} 
                onChange={(e)=>setLocation(e.target.value)} 
                sx={{width:'100%',marginRight:3 }}/>
            </Box>
        </Stack>
        <Box
            sx={{
                width:"60%",
                height:'250px',
                border:'1px dashed gray',
                margin:'auto',
                marginLeft:'auto',
                marginTop:'15px'

            }}
        >
            {!videoAsset ?
             ( 
            <Box
            sx={{
                height:'100%',
                display: 'flex', 
                alignItems: 'center',
                justifyContent:'center'

            }}
            >
                <TextField id="addVid" variant="outlined" type='file' name='upload-img' onChange={uploadImg} accept="video/mp4,video/x-m4v,video/*" sx={{border:'none',display:'none'}}/>
                {loading ?
                 (<>
                 <Spinner msg={'Uploading Your Video'} progressState={progressState}/>
                 </>):
                (
                <>
                    <label htmlFor="addVid"><QueueIcon sx={{color:'gray'}}/></label>
                </>
                 )
                }
             </Box>
             )
             : 
             (<Box
             sx={{
                height:'100%',
                width:'100%',
                display: 'flex', 
                alignItems: 'center',
                justifyContent:'center',
                position:'relative'
                
             }}
             >
                <Box onClick={dltVideo} sx={{position:'absolute',top:'0px',right:'-35px',}}>
                <DeleteOutlineIcon 
                    sx={{
                    cursor:'pointer',
                    width:'25px',
                    height:'25px',
                    padding:'5px',
                    borderRadius:'50%',
                    color:"red",
                    zIndex:'100px'
                }}
                />
                </Box>
                <video 
                    src={videoAsset}
                    controls
                    style={{width:'100%',height:'100%',zIndex:'-100px'}}
                />
             </Box>)}

        </Box>

        </Box>
        <Box
        sx={{
            marginTop:'20px',
            width:'80%',
            marginLeft:'50%',
            transform:'translateX(-50%)'
            
            
        }}
        >
        <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} // tabIndex of textarea
			onChange={newContent => setContent(newContent)}
		/>
        <Button 
            
            variant={`${loading ? "outline" : "contained"}`}
            onClick={()=>uploadDetails()}
            sx={{
                mt:4,
                width:'300px,',
                marginLeft:'50%',
                transform:'translateX(-50%)'
            }}
        >
            Upload
        </Button>
        </Box>
        
    </Box>
  )
}

export default Create