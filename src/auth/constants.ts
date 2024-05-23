import { SetMetadata } from '@nestjs/common';

export const jwt_config = {
  secret: 'abcdefghij',
  expired: 3600,
};
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
