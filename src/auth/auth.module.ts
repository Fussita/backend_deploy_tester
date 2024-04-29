import { Module } from '@nestjs/common';
import { AuthService } from './app/auth.service';
import { AuthController } from './infraestructure/auth.controller';
import { FBManager } from './infraestructure/adapters/firebase/fb-manager.service';
import { DbManagerInterface } from './domain/out_dbmanager_interfaces';
import { AuthServiceInterface } from './domain/in_auth_interface';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './infraestructure/adapters/jwt/jwtConstants';
import { JwtStrategy } from './infraestructure/adapters/jwt/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: DbManagerInterface,
      useClass: FBManager,
    },
    {
      provide: AuthServiceInterface,
      useClass: AuthService,
    },
  ],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '24h'}
    }), 
  ]
})
export class AuthModule {}
