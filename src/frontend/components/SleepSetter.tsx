import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Slider from '@mui/material/Slider';
import HotelIcon from '@mui/icons-material/Hotel';

export type TSleep = number;

interface TProps {
  value?:TSleep;
  onChange:(value:TSleep)=>void;
}

const MAX = 100;
const MIN = 1;

const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];

export default function SleepSetter(props:TProps) {
  const {value,onChange} = props;
  const [tmpValue,setTmpValue] = useState<TSleep|undefined>(value);

  function handleChangeOfTmpValue (event: React.SyntheticEvent | Event, value: number|number[]) {
    const newValue = Array.isArray(value)?value[0]:value;
    setTmpValue(newValue);
  }

  async function handleSubmitOfValue () {
    if(tmpValue&&tmpValue!==value){
      try{
        await onChange(tmpValue);
      }catch(error){
        console.error("SleepSetter",error);
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
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={
        <ListSubheader
          style={{zIndex:0}}
        >
          Sleep Config(进入休眠所需时间)
        </ListSubheader>
      }
    >
      <ListItem>
        <ListItemIcon>
          <HotelIcon/>
        </ListItemIcon>
        <ListItem>
          <Slider
            marks={marks}
            step={1}
            value={tmpValue}
            onChange={handleChangeOfTmpValue}
            onChangeCommitted={handleSubmitOfValue}
            valueLabelDisplay="auto"
            min={MIN}
            max={MAX}
          />
        </ListItem>
        <ListItem
          id="sleep-value"
        >
          {value}分钟
        </ListItem>
      </ListItem>
    </List>
  );
}