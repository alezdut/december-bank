/* eslint-disable camelcase */
import Box from '@mui/material/Box';
import { Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../../api/account/AccountApiResponse';
import { ROUTES } from '../../constants/constants';

interface CustomProps {
  receipt: Transaction;
}

export default function Receipt({ receipt }: CustomProps) {
  const navigate = useNavigate();

  const {
    id,
    description,
    amount,
    amount_from,
    amount_to,
    currency_name,
    createdAt,
    from_account_id,
    to_account_id,
  } = receipt;
  const date = new Date(createdAt);

  return (
    <Container sx={{ alignSelf: 'center' }}>
      <Box
        sx={{
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
          {`Moneda: ${currency_name}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Monto: $${Number(amount).toFixed(2)}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`De cuenta numero: ${from_account_id}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`A la cuenta numero: ${to_account_id}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Monto en moneda de origen: $${Number(amount_from).toFixed(2)}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Monto en moneda de destino: $${Number(amount_to).toFixed(2)}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Referencia: ${description || 'Sin referencia'}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Fecha: ${date.toLocaleDateString()}`}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          onClick={() => navigate(`${ROUTES.HOME}`)}
        >
          Aceptar
        </Button>
      </Box>
    </Container>
  );
}
