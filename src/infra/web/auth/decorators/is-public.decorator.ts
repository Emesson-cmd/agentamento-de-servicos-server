import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'IS_PUBLIC';

export const IsPublic = () => SetMetadata(IS_PUBLIC, true);