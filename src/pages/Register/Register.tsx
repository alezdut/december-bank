import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  CircularProgress,
  Button,
  TextField,
  Container,
} from '@mui/material';
import styles from './Register.module.css';
import { postCreateUser } from '../../api/session/SessionApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setError, startSession } from '../../redux/slices/sessionSlice';

function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const error = useAppSelector((state) => state.session.error);

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, 'El nombre elegido es muy corto')
      .required('El nombre es requerido'),
    email: yup
      .string()
      .email('Ingrese un email valido')
      .required('El email es requerido'),
    password: yup
      .string()
      .min(8, 'La contraseña debe contener al menos 8 caracteres')
      .required('La contraseña es requerida'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Las contraseñas no coinciden!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async ({ name, email, password }) => {
      try {
        setLoading(true);
        const loginData = await postCreateUser({ name, email, password });
        dispatch(startSession(loginData));
        localStorage.clear();
        localStorage.setItem('accessToken', loginData.token);
        setLoading(false);
        navigate('/home');
      } catch (e: any) {
        setLoading(false);
        localStorage.clear();
        dispatch(setError(e?.response?.data.errors[0]));
      }
    },
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
          width: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      sx={{ maxWidth: '50vw', display: 'flex', justifyContent: 'center' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          height: '60vh',
          minWidth: '500px',
        }}
      >
        <h1 className={styles.h1}>Sign Up</h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          {error && (
            <div className={styles.errorMessage}>
              <p>{error}</p>
            </div>
          )}
          <Button color="primary" variant="contained" fullWidth type="submit">
            Register
          </Button>
        </form>
        <div className={styles.registerMessage}>
          <p>Ya estas registrado? </p>
          <Link to="/login"> Ingresa</Link>
        </div>
      </Box>
    </Container>
  );
}

export default Auth;
