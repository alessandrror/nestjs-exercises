import { Injectable } from '@nestjs/common'
// import { CreateUserDTO } from './dto/create-user.dto'
import { PrismaService } from 'src/prisma.service'

// @Injectable()
// export class UsersService {
// 	private users: any[] = [
// 		{
// 			id: 1,
// 			name: 'John Doe',
// 			phone: 12345678
// 		},
// 		{
// 			id: 2,
// 			name: 'Jane Doe',
// 			phone: 87654321
// 		}
// 	]

// 	getUsers() {
// 		return this.users
// 	}

// 	createUser(user: CreateUserDTO) {
// 		this.users.push(user)
// 		return {
// 			id: this.users.length + 1,
// 			...user
// 		}
// 	}
// }

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	getUsers() {
		return this.prisma.user.findMany()
	}

	createUser(user: any) {
		return this.prisma.user.create({ data: user })
	}
}
