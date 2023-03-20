/* eslint-disable camelcase */
import Box from '@mui/material/Box';
import { Typography, Button, Container } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Receipt() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  const description = searchParams.get('description');
  const amount = searchParams.get('amount');
  const amountFrom = searchParams.get('amount_from');
  const amountTo = searchParams.get('amount_to');
  const currencyName = searchParams.get('currency_name');
  const createdAt = searchParams.get('createdAt');
  const fromAccountId = searchParams.get('from_account_id');
  const toAccountId = searchParams.get('to_account_id');

  return (
    <Container sx={{ maxWidth: 'sm', alignSelf: 'center', display: 'flex' }}>
      <Box
        sx={{
          width: '90%',
          maxWidth: 500,
          margin: '10vh',
          padding: '20px',
          border: 'solid 2px black',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Comprobante de transferencia
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`ID de transferencia: ${id}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Moneda: ${currencyName}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Monto: $${Number(amount).toFixed(2)}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`De cuenta numero: ${fromAccountId}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`A la cuenta numero: ${toAccountId}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Monto en moneda de origen: $${Number(amountFrom).toFixed(2)}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Monto en moneda de destino: $${Number(amountTo).toFixed(2)}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Referencia: ${description || 'Sin referencia'}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Fecha: ${createdAt?.split('T')[0]}`}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          onClick={() => navigate('/home')}
        >
          Aceptar
        </Button>
      </Box>
    </Container>
  );
}
