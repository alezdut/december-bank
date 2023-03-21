import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DecemberBankIcon from '@mui/icons-material/Paid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUserInfo } from '../api/account/AccountApi';
import { loadUserInfo, unloadUserinfo } from '../redux/slices/accountSlice';
import { endSession } from '../redux/slices/sessionSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.user);
  const isAuthenticated = useAppSelector(
    (state) => state.session.isAuthenticated,
  );

  const handleHomeClick = (e: any) => {
    e.preventDefault(e);
    navigate(`/home`);
  };

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const us = await getUserInfo();
          dispatch(loadUserInfo(us));
        } catch (e: any) {
          dispatch(unloadUserinfo());
        }
      })();
    }
  }, [isAuthenticated]);

  const clickLogoutHandler = (e: any) => {
    e.preventDefault(e);
    localStorage.clear();
    dispatch(endSession());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <DecemberBankIcon />
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={handleHomeClick}
          >
            December Bank
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ alignSelf: 'center', justifySelf: 'center', flexGrow: 1 }}
          >
            {isAuthenticated && `Hola ${user.name}!`}
          </Typography>
          {isAuthenticated && (
            <Button onClick={clickLogoutHandler} color="inherit">
              Salir
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
