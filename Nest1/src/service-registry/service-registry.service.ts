import { Injectable, Logger } from '@nestjs/common';
import { CreateServiceRegistryDto } from './dto/create-service-registry.dto';
import { UpdateServiceRegistryDto } from './dto/update-service-registry.dto';

@Injectable()
export class ServiceRegistryService {
private readonly logger = new Logger('Service Registry')
  private services: {[key:string]:any};
  private timeout:number

  constructor(){
    this.services = {};
    this.timeout = 30
  }

  register(name: string, version: string, ip: string, port: number): { key: string; message: string } {
   this.cleanup();
   const key = name + version + ip + port;

    this.services = this.services || {};

    if (!this.services[key]) {
      // Service not registered, add a new entry
      this.services[key] = {
        timestamp: Math.floor(Date.now() / 1000),
        ip,
        port
      };

      this.logger.debug(`Added service ${name} at ${ip} with version ${version}`);

      return {
        key,
        message: 'Service successfully registered'
      };
    }

    // Update timestamp for already registered service
    this.services[key].timestamp = Math.floor(Date.now() / 1000);
  
    this.logger.debug(`Update service ${name} at ${ip} with version ${version}`)
    return {
      key,
      message: 'Service already registered, timestamp updated'
    };
}


cleanup():void{
  const now = Math.floor(new Date().getTime() / 1000)

  Object.keys(this.services).forEach((key) => {
    if(this.services[key].timestamp + this.timeout < now){
       delete this.services[key]
       this.logger.debug(`Removed services ${key}`)
    }
  })
}

 unregister(name:string, version:string, ip:string, port:number): {key:string, message:string}{
  const key = name + version + ip + port;
  delete this.services[key]
  this.logger.debug(`Removed service ${name} at ${ip} with version ${version}`)

  return {
    key,
    message: 'Service removed'
  }
 }
}
