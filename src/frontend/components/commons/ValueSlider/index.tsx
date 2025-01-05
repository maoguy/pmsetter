import React, { useEffect, useState, useMemo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Slider from '@mui/material/Slider';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
const MAX = 100;
const MIN = 1;

export type TValue = number;

interface TProps {
  title:string;
  value?:TValue;
  onChange:(value:TValue)=>void;
  options?:{
    MAX?:TValue,
    MIN?:TValue,
    unit?:string,
  }
}

function ValueSlider (props:TProps) {
  const {
    title,
    value,
    onChange,
    options={}
  } = props;
  const [tmpValue,setTmpValue] = useState<TValue|undefined>(value);
  
  const marks = useMemo(()=>([
    {
      value: options?.MIN||MIN,
      label: '',
    },
    {
      value: options?.MAX||MAX,
      label: '',
    },
  ]),[options?.MAX,options?.MIN]);

  function handleChangeOfTmpValue (event: React.SyntheticEvent | Event, value: number|number[]) {
    const newValue = Array.isArray(value)?value[0]:value;
    setTmpValue(newValue);
  }

  async function handleSubmitOfValue () {
    if(tmpValue&&tmpValue!==value){
      try{
        await onChange(tmpValue);
      }catch(error){
        console.error("Setter",error);
      }
    }
    correctTmpValue(); //校正 
  }

  function correctTmpValue() {
    //校正缓存
    if(value!==tmpValue){
      setTmpValue(value);
    }
  }

  useEffect(()=>{
    correctTmpValue(); //校正
  },[value]);

  return (
    <List
      sx={{ width: '100%'}}
      subheader={
        <ListSubheader>
          {title}
        </ListSubheader>
      }
    >
      <ListItem>
        <ListItemIcon>
          <LinearScaleIcon/>
        </ListItemIcon>
        
        <ListItem
          id="sleep-value"
        >
          {tmpValue}{options?.unit}
        </ListItem>
        <ListItem>
          <Slider
            style={{zIndex:2}}
            marks={marks}
            step={1}
            value={tmpValue}
            onChange={handleChangeOfTmpValue}
            onChangeCommitted={handleSubmitOfValue}
            valueLabelDisplay="auto"
            min={options?.MIN||MIN}
            max={options?.MAX||MAX}
          />
        </ListItem>
      </ListItem>
    </List>
  );
}

export default ValueSlider;