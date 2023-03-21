import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CURRENCY_SYMBOL } from '../constants/currencySymbol';
import style from './AccountCard.module.css';

function AccountCard({ account }: any) {
  const navigate = useNavigate();

  const {
    id,
    balance,
    currency: { name },
  }: {
    id: number;
    balance: number;
    currency: { name: 'USD' | 'URU' | 'EU' };
  } = account;

  const handleButtonClick = () => {
    navigate(`/transfer?id=${id}&currency=${name}`);
  };

  return (
    <Card
      className={style.card}
      sx={{
        minWidth: '320px',
        margin: '1vw',
      }}
      key={id}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
          color="text.secondary"
          gutterBottom
        >
          {id}
        </Typography>
        <Typography variant="h5" component="div">
          {`${CURRENCY_SYMBOL[name]} ${balance.toFixed(2)}`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex' }}>
        <Button
          size="small"
          onClick={handleButtonClick}
          sx={{
            alignSelf: 'flex-end',
            justifySelf: 'flex-end',
          }}
        >
          Transferir
        </Button>
      </CardActions>
    </Card>
  );
}
export default AccountCard;
