export const jwt_config = {
  secret: process.env.JWT_SECRET,
  expired: process.env.JWT_EXPIRES_IN,
};
export const session = {
  secret: 'h01873dyh1o8rh42697gd8oy2-9f8hpu4f-2pjh3ndfio27gf',
  salt: 'udh917ho7fh-2389',
};
export const methods: string = 'GET, PUT, DELETE, POST';
