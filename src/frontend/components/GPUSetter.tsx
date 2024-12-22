import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import Radio from '@mui/material/Radio';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import AssistWalkerIcon from '@mui/icons-material/AssistWalker';

export type TGpuswitch = 0|1|2;

interface TProps {
  value?:number;
  onChange:(value:TGpuswitch)=>void;
}

export default function GPUSetter(props:TProps) {
  const {value,onChange} = props;

  function handleChangeOfRadio (event: React.ChangeEvent) {
    const newValue = (event as any).target?.value;
    onChange(newValue);
  }

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Gpu Settings</ListSubheader>}
    >
      <ListItem>
        <ListItemIcon>
          <AssistWalkerIcon/>
        </ListItemIcon>
        <ListItemText id="intergrated-graphics-only" primary="Integrated graphics card only" />
        <Radio
          edge="end"
          value={0}
          checked={value===0} //只使用集成显卡
          onChange={handleChangeOfRadio}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccessibleForwardIcon/>
        </ListItemIcon>
        <ListItemText id="discrete-graphics-only" primary="Discrete graphics card only" />
        <Radio
          edge="end"
          value={1}
          checked={value===1} //只使用独立显卡
          onChange={handleChangeOfRadio}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccessibleIcon/>
        </ListItemIcon>
        <ListItemText id="auto-graphics-switch" primary="Automatically switch graphics cards" />
        <Radio
          edge="end"
          value={2}
          checked={value===2} //自动切换显卡
          onChange={handleChangeOfRadio}
        />
      </ListItem>
    </List>
  );
}