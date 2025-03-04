import {NestFactory} from '@nestjs/core'
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap(){
    try {
        const app = await NestFactory.create(AppModule)

        const config = new DocumentBuilder()
        .setTitle("My NestJS API")
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('tasks')
        .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);

        const PORT = process.env.PORT || 4000
        app.listen(PORT, () => {
            console.log('server running on: http://localhost:' + PORT);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

bootstrap()