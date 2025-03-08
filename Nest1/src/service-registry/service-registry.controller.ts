import { Body, Controller, Put, Req } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceRegistryService } from './service-registry.service';
import { CreateServiceRegistryDto } from './dto/create-service-registry.dto';
import { UpdateServiceRegistryDto } from './dto/update-service-registry.dto';
import { Request } from 'express';

@Controller()
export class ServiceRegistryController {
  constructor(private readonly serviceRegistryService: ServiceRegistryService) {}

  getIpAddress(@Req() request:Request):string{
    const forwardHeader = request.headers['x-forwarded-for'];

    const ip = typeof forwardHeader === 'string' ? forwardHeader.split(',')[0].trim() : request.socket.remoteAddress;

    return ip?.includes('::') ? `[${ip}]` : ip!;
  }

//   @Put('')
//   registerService(
//     @Req()request:Request,
//     @Body('name') name:string,
//     @Body('version') version:string,
//     @Body('port') port:string,
//   ): {key:string, message:string}{

//   }
}
