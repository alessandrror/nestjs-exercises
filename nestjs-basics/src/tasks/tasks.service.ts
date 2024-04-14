import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDTO } from './dto/create-task.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'

@Injectable()
export class TasksService {
	private tasks = []

	getTask(id: number) {
		const taskFound = this.tasks.find((e) => e.id === id)
		if (!taskFound) return new NotFoundException(`Task with id ${id} not found!`)
		return taskFound
	}

	getTasks() {
		return this.tasks
	}

	createTask(task: CreateTaskDTO) {
		this.tasks.push({
			id: this.tasks.length + 1,
			...task
		})
		return task
	}

	updatingTask(task: UpdateTaskDTO) {
		console.log(task)
		return 'Updating task'
	}

	deletingTask() {
		return 'Deleting task'
	}

	updatingTaskStatus() {
		return 'Updating task status'
	}
}
