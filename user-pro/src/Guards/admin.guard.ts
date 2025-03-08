import { CanActivate, Injectable, UnauthorizedException, ExecutionContext, ForbiddenException, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
       const request = context.switchToHttp().getRequest()

       const authHeader = request.headers.authorization;
       if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthorizedException('Missing or invalid token')
       }

       const adminToken = authHeader.split(' ')[1]
       try {
        const payload = await this.jwtService.verifyAsync(adminToken, {secret: process.env.JWT_SECRET})
        
        if(payload.role !== 'admin'){
            throw new ForbiddenException('You are not admin')
        }
        
        request['user'] = payload
        return true
       } catch (error) {
        if(error instanceof HttpException) throw error
        console.error(error)
        throw new UnauthorizedException()
       }
    }
}
