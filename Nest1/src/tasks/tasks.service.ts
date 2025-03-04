import { Injectable,NotFoundException } from '@nestjs/common';
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
    async findOneTask(id:string): Promise<Task>{
        const task = await this.taskModel.findById(id).exec();
    if(!task) throw new NotFoundException('Task not found')
    return task;
    }

    async createTask(task:Task): Promise<Task>{
        const newTask = new this.taskModel(task)
        return newTask.save();
    }

    // update a task by its id
    async updateTask(id: string, task: Task): Promise<Task> {
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
        if (!updatedTask) throw new NotFoundException('Task not found');
        return updatedTask;
    }

    async deleteTask(id:string):Promise<string>{
        const task = await this.taskModel.findByIdAndDelete(id).exec()
        if(!task) throw new NotFoundException('Task not found')

        return 'Task deleted successfully'
        
    }
}
