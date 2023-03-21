import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { getAccounts } from '../api/account/AccountApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loadAccounts, unloadAccount } from '../redux/slices/accountSlice';
import AccountCard from '../components/AccountCard';
import TransactionList from '../components/TransactionList';

function Home() {
  const dispatch = useAppDispatch();
  const accountState = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(false);

  const boxStyle = {
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%',
    height: '5vh',
  };

  const getAccountData = async () => {
    try {
      setLoading(true);
      const acc = await getAccounts();
      setLoading(false);
      dispatch(loadAccounts(acc));
    } catch (e: any) {
      setLoading(false);
      dispatch(unloadAccount());
    }
  };

  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <Box sx={{ width: '100vw' }}>
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
        {loading && <CircularProgress />}
        {!loading &&
          accountState.accounts.map((account) => (
            <AccountCard account={account} key={account.id} />
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
          width: '100%',
          '@media screen and (max-width: 70em)': {
            flexDirection: 'column',
          },
        }}
      >
        <TransactionList />
      </Container>
    </Box>
  );
}

export default Home;
