import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {ConfigModule} from '@nestjs/config'
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from "@nestjs/mongoose";
import { ServiceRegistryModule } from './service-registry/service-registry.module';



@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI!),
        TasksModule,
        ServiceRegistryModule
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [],
})


export class AppModule{}