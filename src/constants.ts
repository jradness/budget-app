const production = {
  baseUrl: process.env.BASE_URL
};
const development = {
  baseUrl: 'http://localhost:3000'
};

export const config = process.env.NODE_ENV === 'development' ? development : production;