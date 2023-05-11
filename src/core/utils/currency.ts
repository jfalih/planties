import {default as LibCurrency} from 'currency.js';

const currency = (val?: number, options?: LibCurrency.Options): string => {
  const libOptions = {
    symbol: 'IDR',
    decimal: ',',
    precision: 0,
    separator: '.',
    pattern: '# !',
    ...options,
  };

  return LibCurrency(val || 0, libOptions).format();
};

export default currency;
