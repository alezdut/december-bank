import Container from '@mui/material/Container';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getAccounts } from '../api/account/AccountApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loadAccounts, unLoadAccount } from '../redux/slices/accountSlice';
import AccountCard from '../components/AccountCard';
import TransactionList from '../components/TransactionList';

function Home() {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.account);

  const boxStyle = {
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%',
    height: '5vh',
  };

  const getAccountData = async () => {
    try {
      const acc = await getAccounts();
      dispatch(loadAccounts(acc));
    } catch (e: any) {
      dispatch(unLoadAccount());
    }
  };

  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <>
      <Box
        sx={{
          ...boxStyle,
          marginTop: '10vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Cuentas
        </Typography>
      </Box>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          marginTop: '1vh',
          width: '80vw',
          '@media screen and (max-width: 70em)': {
            flexDirection: 'column',
          },
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        {accounts.accounts.map((a) => (
          <AccountCard account={a} key={a.id} />
        ))}
      </Container>
      <Box
        sx={{
          ...boxStyle,
          marginTop: '1vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Transacciones
        </Typography>
      </Box>
      <Container
        maxWidth="md"
        sx={{
          marginTop: '1vh',
          '@media screen and (max-width: 70em)': {
            flexDirection: 'column',
          },
        }}
      >
        <TransactionList />
      </Container>
    </>
  );
}

export default Home;
