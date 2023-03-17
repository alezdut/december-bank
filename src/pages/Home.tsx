import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { getAccounts } from '../api/account/AccountApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loadAccounts, unLoadAccount } from '../redux/slices/accountSlice';
import AccountCard from '../components/AccountCard';
import MainAppBar from '../components/MainAppBar';
import TransactionList from '../components/TransactionList';

function Home() {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.account);

  useEffect(() => {
    (async () => {
      try {
        const acc = await getAccounts();
        dispatch(loadAccounts(acc));
      } catch (e: any) {
        dispatch(unLoadAccount());
      }
    })();
  }, []);

  return (
    <>
      <MainAppBar />
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          marginTop: '10vh',
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
