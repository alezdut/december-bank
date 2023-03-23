import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/constants';
import { useAppSelector } from '../redux/hooks';

interface PropType {
  component: React.FC;
}

// eslint-disable-next-line react/function-component-definition
const PrivateRoute: FC<PropType> = ({ component: Component }) => {
  const { isAuthenticated } = useAppSelector(
    (state: { session: any }) => state.session,
  );

  if (isAuthenticated) return <Component />;
  return <Navigate to={`${ROUTES.LOGIN}`} />;
};

export default PrivateRoute;
