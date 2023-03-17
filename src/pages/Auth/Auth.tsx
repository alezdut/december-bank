import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './Auth.module.css';
import { postLogin } from '../../api/session/SessionApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setError, startSession } from '../../redux/slices/sessionSlice';

function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector((state) => state.session.error);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Ingrese un email valido')
      .required('El email es requerido'),
    password: yup
      .string()
      .min(8, 'La contraseña debe contener al menos 8 caracteres')
      .required('La contraseña es requerida'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const loginData = await postLogin(values);
        dispatch(startSession(loginData));
        sessionStorage.setItem('accessToken', loginData.token);
        navigate('/home');
      } catch (e: any) {
        dispatch(setError(e?.response?.data.errors[0]));
      }
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '50vh',
      }}
    >
      <h1 className={styles.h1}>Sign In</h1>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
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
        {error !== '' && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        <Button color="primary" variant="contained" fullWidth type="submit">
          Login
        </Button>
        <div className={styles.registerMessage}>
          <p>No estas registrado? </p>
          <Link to="/register"> Registrate</Link>
        </div>
      </form>
    </Box>
  );
}

export default Auth;
