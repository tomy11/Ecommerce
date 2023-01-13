import { ConfigService } from '@nestjs/config';

export const jwtConstants: any = {
  secret: (config: ConfigService) => config.get('JWT_SECRET'),
};
