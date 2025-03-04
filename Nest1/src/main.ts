import {NestFactory} from '@nestjs/core'
import { AppModule } from './app.module';


async function bootstrap(){
    try {
        const app = await NestFactory.create(AppModule)
        app.setGlobalPrefix('api')
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`server running: http://localhost:${PORT}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

bootstrap()