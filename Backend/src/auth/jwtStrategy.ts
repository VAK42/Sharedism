import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "1ba64dd24667468c1c763d111d7d37db2028e9f53a0c1626792dd4d3472c30ee7fb80d8b5681aea49dbb5ee338757607d486d08cf2fa759b25e5eb597e8b44f9",
    });
  }
  validate(payload: { id: string; email: string }) {
    console.log("Jwt Payload:", payload);
    return { id: payload.id, email: payload.email };
  }
}