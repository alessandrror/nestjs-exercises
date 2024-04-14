import { Body, Controller, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller()
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiTags('users')
	@Get('/users')
	getAllUsers() {
		return this.usersService.getUsers()
	}

	@ApiTags('users')
	@Post('/users')
	createUser(@Body() user: CreateUserDTO) {
		return this.usersService.createUser(user)
	}
}
