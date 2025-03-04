import { Injectable } from "@nestjs/common";


@Injectable()
export class AppService {
    private items:any = [
        {
            id: 1,
            name: 'Ali',
            surname: 'Odilov'
        }
    ]
    getAllData(){
        return this.items
    }
    getData(){
        return 'olim'
    }
}