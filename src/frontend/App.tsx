import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import PowerIcon from '@mui/icons-material/Power';
import MoreIcon from '@mui/icons-material/More';
import Paper from '@mui/material/Paper';
import MorePage from './pages/MorePage';
import BatteryPage from './pages/BatteryPage';
import ACPage from './pages/ACPage';

enum TabKeys {
  BATTERY_SETTING = "BATTERY_SETTING",
  AC_SETTING = "AC_SETTING",
  MORE = "MORE",
}

export default function FixedBottomNavigation() {
  const [currentTabKey, setCurrentTabKey] = React.useState<TabKeys>(TabKeys.BATTERY_SETTING);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [currentTabKey, setCurrentTabKey]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      {/* <List>
        {messages.map(({ primary, secondary, person }, index) => (
          <ListItemButton key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItemButton>
        ))}
      </List> */}
      {/* <GPUSetter/>
      <Divider/>
      <GPUSetter/> */}
      <div
        style={{
          maxWidth:500,
          margin:"auto",        
        }}
      >
      {
        currentTabKey===TabKeys.BATTERY_SETTING
        &&
        <BatteryPage/>
      }
      {
        currentTabKey===TabKeys.AC_SETTING
        &&
        <ACPage/>
      }
      {
        currentTabKey===TabKeys.MORE
        &&
        <MorePage/>
      }
      </div>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex:1000
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={currentTabKey}
          onChange={(event, newValue) => {
            setCurrentTabKey(newValue);
          }}
        >
          <BottomNavigationAction label="Battery" icon={<BatteryFullIcon />} value={TabKeys.BATTERY_SETTING}/>
          <BottomNavigationAction label="AC" icon={<PowerIcon />} value={TabKeys.AC_SETTING}/>
          <BottomNavigationAction label="More" icon={<MoreIcon />} value={TabKeys.MORE}/>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}