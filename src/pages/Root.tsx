import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
// import MainNavigator from '../components/MainNavigator';

function Root() {
  return (
    <Container maxWidth="sm">
      {/* <MainNavigator /> */}
      <Outlet />
    </Container>
  );
}

export default Root;
