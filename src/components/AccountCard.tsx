import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CURRENCY_SYMBOL from '../constants/currencySymbol';

function AccountCard({ account }: any) {
  const {
    id,
    balance,
    currency: { name },
  }: {
    id: number;
    balance: number;
    currency: { name: 'USD' | 'URU' | 'EU' };
  } = account;

  return (
    <Card
      sx={{
        display: 'flex',
        '@media screen and (max-width: 70em)': {
          width: '80%',
        },
        width: '15vw',
        minWidth: '320px',
        margin: '1vw',
      }}
      key={id}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignContent: 'center',
          height: '100%',
          width: '80%',
        }}
      >
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
