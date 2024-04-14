import {
	Controller,
	Get,
	HttpCode,
	Param,
	ParseBoolPipe,
	ParseIntPipe,
	Query,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ValidateUserPipe } from './pipes/validate-user/validate-user.pipe'
import { AuthGuard } from './guards/auth/auth.guard'

@Controller()
export class HelloController {
	@Get('/hello')
	index(@Req() request: Request, @Res() response: Response) {
		console.log(request.url)
		response.status(200).json({
			message: 'Hello Wolrd'
		})
	}

	@Get('new')
	@HttpCode(201)
	somethingNew() {
		return 'something new'
	}

	@Get('notfound')
	@HttpCode(404)
	notFoundPage() {
		return '404 not found'
	}

	@Get('error')
	@HttpCode(500)
	errorPage() {
		return 'error route'
	}

	@Get('/ticket/:num')
	getNumbers(@Param('num', ParseIntPipe) num: number) {
		console.log(typeof num)
		return num + 14
	}

	@Get('/active/:status')
	@UseGuards(AuthGuard)
	isUserActive(@Param('status', ParseBoolPipe) status: boolean) {
		console.log(typeof status)
		return status
	}

	@Get('/greet')
	@UseGuards(AuthGuard)
	greet(@Query(ValidateUserPipe) query: { name: string; age: number }) {
		console.log(typeof query.name)
		console.log(typeof query.age)
		return `Hello ${query.name}, you are ${query.age} years old!`
	}
}
