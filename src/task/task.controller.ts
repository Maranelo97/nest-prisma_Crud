import { Controller, Get, Post, Put, Delete, Param, Body,NotFoundException } from "@nestjs/common";
import { TaskService } from "./task.service";
import { task } from "@prisma/client";

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Post()
    async createTask(@Body() data: task) {
        return this.taskService.createTask(data)
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        const taskFound = await  this.taskService.getTaskById(Number(id))
        if ( !taskFound ) throw new NotFoundException("Task doesn´t exist")
        return taskFound
    }

    @Delete(':id')
    async deleteTaskById(@Param('id') id: string) {
            try{
                return await this.taskService.deleteTask(Number(id))
            }
            catch(err){
                throw new NotFoundException("Task does not exist!")
            }
    }

    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() data: task) {
        try {
            return await this.taskService.updateTask(Number(id), data)
        } catch (error) {
            throw new NotFoundException("You must select an existent task")
        }
    }
}