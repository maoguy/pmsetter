import { useState,useEffect } from 'react';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import TuneIcon from '@mui/icons-material/Tune';

export type TValue = 0|1|number;

interface TProps {
  title:string;
  value?:TValue;
  onChange:(value:TValue)=>void;
  options?:{
    tips?:string
  }
}

function ValueSwitcher (props:TProps) {
  const {
    title,
    value,
    onChange,
    options={}
  } = props;

  function handleChangeOfSwitch (event: React.ChangeEvent) {
    const newValue = (event as any).target?.checked?1:0;
    onChange(newValue);
  }

  return (
    <List
      sx={{ width: '100%' }}
      subheader={
        <ListSubheader>
          {title}
        </ListSubheader>
      }
    >
      <ListItem>
        <ListItemIcon>
          <TuneIcon/>
        </ListItemIcon>
        <ListItemText id="stanby" primary={options?.tips} />
        <Switch
          edge="end"
          checked={value===1} //是否启用
          onChange={handleChangeOfSwitch}
        />
      </ListItem>
    </List>
  );
}

export default ValueSwitcher;