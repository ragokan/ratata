import { JwtPayload } from "src/common/guards/jwt-payload.dto";

export declare module "fastify" {
  export interface FastifyRequest {
    jwtPayload: JwtPayload;
  }
}
