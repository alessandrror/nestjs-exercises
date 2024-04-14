import { Body, Controller, Delete, Get, Patch, Post, Put, Query, Param } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDTO } from './dto/create-task.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller({
	path: '/tasks'
})
@ApiTags('tasks')
export class TasksController {
	taskService: TasksService

	constructor(taskService: TasksService) {
		this.taskService = taskService
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Get a task by id' })
	getTask(@Param('id') id: string) {
		console.log(id)
		return this.taskService.getTask(parseInt(id))
	}

	@Get()
	@ApiOperation({ summary: 'Get all tasks' })
	@ApiResponse({ status: 200, description: 'Return all tasks!' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	getAllTasks(@Query() query: any) {
		console.log(query)
		return this.taskService.getTasks()
	}

	@Post()
	@ApiOperation({ summary: 'Create a tasks' })
	createTask(@Body() task: CreateTaskDTO) {
		return this.taskService.createTask(task)
	}

	@Put()
	updateTask(@Body() task: UpdateTaskDTO) {
		return this.taskService.updatingTask(task)
	}

	@Delete()
	deleteTask() {
		return this.taskService.deletingTask()
	}

	@Patch()
	updateTaskStatus() {
		return this.taskService.updatingTaskStatus()
	}
}
