import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DecemberBankIcon from '@mui/icons-material/Paid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUserInfo } from '../api/account/AccountApi';
import { loadUserInfo, unLoadUserinfo } from '../redux/slices/accountSlice';
import { endSession } from '../redux/slices/sessionSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.user);

  useEffect(() => {
    (async () => {
      try {
        const us = await getUserInfo();
        dispatch(loadUserInfo(us));
      } catch (e: any) {
        dispatch(unLoadUserinfo());
      }
    })();
  }, [user]);

  const clickLogoutHandler = (e: any) => {
    e.preventDefault(e);
    dispatch(endSession());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <DecemberBankIcon />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            December Bank
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.name}
          </Typography>
          <Button onClick={clickLogoutHandler} color="inherit">
            Salir
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
