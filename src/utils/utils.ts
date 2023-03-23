import { getRates } from '../api/account/AccountApi';

type currency = 'USD' | 'EU' | 'URU';

// eslint-disable-next-line consistent-return
export default async function getExchangeRates(
  originCurrency: currency,
  destinyCurrency: string,
  amount: number,
) {
  try {
    const rates = await getRates();
    const conversor = {
      URU: () =>
        destinyCurrency === 'USD' ? amount * rates.usd : amount * rates.eu,
      EU: () =>
        destinyCurrency === 'URU'
          ? amount / rates.eu
          : (amount / rates.eu) * rates.usd,
      USD: () =>
        destinyCurrency === 'URU'
          ? amount / rates.usd
          : (amount / rates.usd) * rates.eu,
    };
    if (rates) return conversor[originCurrency];
  } catch (error) {
    return -1;
  }
}
