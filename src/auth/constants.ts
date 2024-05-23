import { SetMetadata } from '@nestjs/common';

export const jwt_config = {
  secret: 'fhd2837fh982o73h0p28hf027h3f8o2g3h-f928p3jn2309pfh2983fp23u31fp2n3',
  expired: 3600,
};
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const session = {
  secret: 'h01873dyh1o8rh42697gd8oy2-9f8hpu4f-2pjh3ndfio27gf',
  salt: 'udh917ho7fh-2389',
};
export const methods: string = 'GET, PUT, DELETE, POST';
