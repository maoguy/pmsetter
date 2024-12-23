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

export type THibernatemode = 0|3|25;

interface TProps {
  value?:number;
  onChange:(value:THibernatemode)=>void;
}

export default function HibernatemodeSetter(props:TProps) {
  const {value,onChange} = props;

  function handleChangeOfRadio (event: React.ChangeEvent) {
    const newValue = (event as any).target?.value;
    onChange(newValue);
  }

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={
        <ListSubheader
          style={{zIndex:0}}
        >
          Hibernatemode(冬眠模式)
        </ListSubheader>
      }
    >
      <ListItem>
        <ListItemIcon>
          <AssistWalkerIcon/>
        </ListItemIcon>
        <ListItemText id="25" primary="不向内存供电，将内存镜像直接写入硬盘(响应速度慢，耗电量少)" />
        <Radio
          edge="end"
          value={25}
          checked={value===25} //不向内存供电，将内存镜像直接写入硬盘
          onChange={handleChangeOfRadio}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccessibleForwardIcon/>
        </ListItemIcon>
        <ListItemText id="0" primary="持续向内存供电，将数据保留在内存(响应速度快，耗电量大)" />
        <Radio
          edge="end"
          value={0}
          checked={value===0} //持续向内存供电，将数据保留在内存
          onChange={handleChangeOfRadio}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccessibleIcon/>
        </ListItemIcon>
        <ListItemText id="3" primary="自动模式，数据既写入内存又写入硬盘(唤醒时，根据设备电量自动选择从 内存/硬盘 恢复)" />
        <Radio
          edge="end"
          value={3}
          checked={value===3} //safe sleep, 数据既写入内存又写入硬盘
          onChange={handleChangeOfRadio}
        />
      </ListItem>
    </List>
  );
}