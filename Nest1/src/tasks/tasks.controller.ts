import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';


@Controller('tasks')
export class TasksController {
   constructor(private readonly taskService: TasksService){}

   @Get()
   async getAllTasks(): Promise<Task[]>{
    return this.taskService.getAllTasks()
   }

   @Get(":id")
    async findOneTask(@Param("id") id:string):Promise<Task>{
        return this.taskService.findOneTask(id)
    }

    @Post()
    async createTask(@Body() task: Task): Promise<Task>{
        return this.taskService.createTask(task)
    }

    @Put(":id")
    async updateTask(@Param("id") id:string, @Body() task: Task):Promise<Task>{
        return this.taskService.updateTask(id, task)
    }

    @Delete(":id")
    async deleteTask(@Param("id") id:string):Promise<string>{
        return this.taskService.deleteTask(id)
    }
}
