import { JwtService } from '../jwt.service';
import { JsonWebTokenService } from './jsonwebtoken.jwt.service';

export const jsonWebTokenJwtServiceProvider = {
  provide: JwtService,
  useClass: JsonWebTokenService,
};
