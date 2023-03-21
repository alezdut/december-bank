import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import styles from './Transfer.module.css';
import { postTransaction } from '../../api/account/AccountApi';
import { useAppSelector } from '../../redux/hooks';
import getExchangeRates from '../../utils/utils';
import { CURRENCY_OPTIONS } from '../../constants/currency';

function Transfer() {
  const navigate = useNavigate();
  const accounts = useAppSelector((state) => state.account.accounts);
  const [searchParams] = useSearchParams();

  const [account, setAccount] = useState<number>(
    Number(searchParams.get('id')),
  );
  const [currency, setCurrency] = useState(searchParams.get('currency' || ''));
  const [amount, setAmount] = useState<number>();
  const [destination, setDestination] = useState<number>();
  const [reference, setReference] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originAmount, setOriginAmount] = useState(0);
  const [originCurrency, setOriginCurrency] = useState('');

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentAccount = accounts.filter((a) => a.id === account && a);
    if (currentAccount[0].currency.name !== currency) {
      setLoading(true);
      setOriginCurrency(currentAccount[0].currency.name);
      const origAmount = await getExchangeRates(
        currentAccount[0].currency.name,
        currency!,
        amount!,
      );
      setOriginAmount(origAmount!);
      setLoading(false);
      setConfirmOpen(true);
      return;
    }
    setOriginAmount(0);
    setConfirmOpen(true);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setConfirmOpen(false);
      setLoading(true);
      const { data } = await postTransaction({
        description: reference,
        account_from: account!,
        account_to: destination!,
        amount: amount!,
        currency_name: currency!,
      });

      if (data) {
        setLoading(false);
        navigate(
          `/receipt?id=${data.id}&amount=${data.amount}&amount_from=${data.amount_from}&amount_to=${data.amount_to}
          &createdAt=${data.createdAt}&currency_name=${data.currency_name}&description=${data.description}
          &from_account_id=${data.from_account_id}&to_account_id=${data.to_account_id}`,
        );
        setConfirmOpen(false);
      }
    } catch (err: any) {
      setConfirmOpen(false);
      setLoading(false);
      setError(err.response.data.errors[0]);
      setErrorOpen(true);
    }
  };

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
    <Container maxWidth="sm" className={styles.container}>
      <form onSubmit={handleConfirm} className={styles.form}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <FormControl
            fullWidth
            sx={{
              marginBottom: '1vh',
              marginRight: '1vw',
            }}
          >
            <InputLabel id="account-label">Cuenta</InputLabel>
            <Select
              labelId="account-label"
              id="account"
              value={account}
              onChange={(e) => setAccount(e.target.value as number)}
              required
            >
              {accounts.map((acc) => (
                <MenuItem key={acc.id} value={acc.id}>
                  {acc.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              marginBottom: '1vh',
            }}
          >
            <InputLabel id="currency-label">Moneda</InputLabel>
            <Select
              labelId="currency-label"
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as string)}
              required
            >
              {CURRENCY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          sx={{
            marginBottom: '1vh',
          }}
          id="amount"
          label="Importe"
          type="number"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(Number(e.target.value))
          }
          required
        />
        <TextField
          sx={{
            marginBottom: '1vh',
          }}
          id="destination"
          label="Cuenta destino"
          type="number"
          value={destination}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDestination(Number(e.target.value))
          }
          required
        />

        <TextField
          sx={{
            marginBottom: '1vh',
          }}
          id="reference"
          label="Referencia"
          value={reference}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setReference(e.target.value)
          }
          inputProps={{ maxLength: 128 }}
        />

        <Button type="submit" variant="contained" color="primary">
          Confirmar transferencia
        </Button>

        <Dialog open={confirmOpen}>
          <DialogTitle>Confirmar Transferencia</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Desea efectuar la transferencia por ${currency} ${amount} de la
              cuenta ${account} a la cuenta ${destination}`}
            </DialogContentText>
            <DialogContentText>
              {reference && `Referencia: ${reference}`}
            </DialogContentText>
            <DialogContentText>
              {originAmount !== 0 &&
                `Se debitaran ${originCurrency}${originAmount.toFixed(
                  2,
                )} de la cuenta de origen`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmOpen(false)}
              color="secondary"
              autoFocus
            >
              Cerrar
            </Button>
            <Button onClick={handleFormSubmit} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={errorOpen} color="error">
          <DialogTitle>Error al realizar la transferencia</DialogTitle>
          <DialogContent>
            <DialogContentText>{error}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setErrorOpen(false)}
              color="secondary"
              autoFocus
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </Container>
  );
}

export default Transfer;
