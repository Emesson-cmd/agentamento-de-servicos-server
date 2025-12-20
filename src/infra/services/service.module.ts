import { Module } from '@nestjs/common';
import { JsonWebTokenService } from './jwt/jsonwebtoken/jsonwebtoken.jwt.service';
import { jsonWebTokenJwtServiceProvider } from './jwt/jsonwebtoken/jsonwebtoken.jwt.service.provider';

@Module({
  imports: [],
  providers: [JsonWebTokenService, jsonWebTokenJwtServiceProvider],
  exports: [jsonWebTokenJwtServiceProvider],
})
export class ServiceModule {}
