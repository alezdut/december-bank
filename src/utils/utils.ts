import { getRates } from '../api/account/AccountApi';

type currency = 'USD' | 'EU' | 'URU';

// eslint-disable-next-line consistent-return
export default async function getExchangeRates(
  originCurrency: currency,
  destinyCurrency: string,
  amount: number,
) {
  const rates = await getRates();
  if (rates) {
    if (originCurrency === 'URU') {
      if (destinyCurrency === 'USD') return amount * rates.usd;
      if (destinyCurrency === 'EU') return amount * rates.eu;
    }
    if (originCurrency === 'EU') {
      if (destinyCurrency === 'URU') return amount / rates.eu;
      if (destinyCurrency === 'USD') return (amount / rates.eu) * rates.usd;
    }
    if (originCurrency === 'USD') {
      if (destinyCurrency === 'URU') return amount / rates.usd;
      if (destinyCurrency === 'EU') return (amount / rates.usd) * rates.eu;
    }
  }
}
