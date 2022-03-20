import React, { useEffect, useState } from 'react'
import {Grid, Fab} from '@mui/material'
import ClassGridItem from '../ClassGridItem/ClassGridItem'
import AddClassDialog from './AddDialog/AddClass'

import { SpeedDialIcon } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {getClasses} from '../../redux/user/userActions';
import { CircularProgress } from '@mui/material'

function ClassGrid() {
    const [open, setOpen]=useState(false);

    const user=useSelector(state=>state.user);
    const data=user.classes;
    const [loading, setLoading]=useState(false);
    const dispatch=useDispatch();
    useEffect(()=>{
        if(data.length==0)
        {
            setLoading(true);
        }
        else{
            setLoading(false)
        }
        dispatch(getClasses(user.id));
        
    },[data.length]);
    useEffect(()=>{console.log(data)})
    if(loading)
    {
        return<div style={{flex:1,display:'flex', justifyContent:'center', alignItems:'center'}} >
            <CircularProgress/>
        </div>
    }
  return (
      <div style={{overflow:'auto'}}>

    <Grid container spacing={10} padding={'9px 10px'} scrollAble >
            {data.map((i)=><Grid item xs={3}><ClassGridItem data={i}/></Grid>)}
        </Grid>
        <AddClassDialog open={open} setOpen={setOpen} />
        <Fab  onClick={()=>setOpen(true)} style={{position:'absolute', bottom:26, right:26}} size="large" color="primary" aria-label="Add Class">
            <SpeedDialIcon/>
        </Fab>
      </div>
  )
}

export default ClassGrid