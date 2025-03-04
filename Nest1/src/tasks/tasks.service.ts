import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}

    // get all tasks from the DB
    async getAllTasks(): Promise<Task[]>{
        return this.taskModel.find().exec();
    }
    // get single task
    async findOneTask(id:string): Promise<Task | string>{
        const task = await this.taskModel.findById(id).exec();
    if(!task) return 'Task not found'
    return task
    }

    async createTask(task:Task): Promise<Task>{
        const newTask = new this.taskModel(task)
        return newTask.save();
    }

    // update a task by its id
    async updateTask(id:string, task:Task):Promise<Task | string>{
        const foundTask = await this.taskModel.findByIdAndUpdate(id, task, {new:true}).exec();
        if(!foundTask) return 'Task not found'
          return foundTask
    }

    async deleteTask(id:string):Promise<string>{
        const task = await this.taskModel.findByIdAndDelete(id).exec()
        if(!task) return 'task not found'

        return 'task deleted successfully'
        
    }
}
