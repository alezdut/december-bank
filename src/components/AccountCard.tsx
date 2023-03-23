import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CURRENCY_SYMBOLS } from '../constants/currency';
import style from './AccountCard.module.css';
import { Account } from '../api/account/AccountApiResponse';
import { ROUTES } from '../constants/constants';

interface AccountCardProps {
  account: Account;
}

function AccountCard({ account }: AccountCardProps) {
  const navigate = useNavigate();
  const {
    id: accountId,
    balance,
    currency: { name: currencyName },
  } = account;
  const symbol = CURRENCY_SYMBOLS[currencyName];

  const handleButtonClick = () => {
    navigate(`${ROUTES.TRANSFER}?id=${accountId}&currency=${currencyName}`);
  };

  return (
    <Card
      className={style.card}
      sx={{
        minWidth: '320px',
        margin: '1vw',
      }}
      key={accountId}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
          color="text.secondary"
          gutterBottom
        >
          {accountId}
        </Typography>
        <Typography variant="h5" component="div">
          {`${symbol} ${balance.toFixed(2)}`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {currencyName}
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
