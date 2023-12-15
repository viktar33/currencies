const prod = 'https://currencies.somee.com/api';
const dev = 'https://localhost:7247/api';

export const config = process.env.NODE_ENV === 'development' ? dev : prod;