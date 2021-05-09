import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'User 1',
            email: 'User1@sss.sss'
        },
        {
            id: 2,
            name: 'User 2',
            email: 'User2@sss.sss'
        },
        {
            id: 3,
            name: 'User 3',
            email: 'User3@sss.sss'
        },
        {
            id: 4,
            name: 'User 4',
            email: 'User4@sss.sss'
        }
    ]

    findAll(): Array<{}> {
        return this.users;
    }

    findById(id: string): Object {
        return this.users.find((item: any) => item.id === +id);
    }

    createUser(createUser): string {
        const newUser = {
            id: Date.now(),
            name: createUser.name,
            email: createUser.email
        }
        this.users.push(newUser);
        return 'User created';
    }

    updateUser(id: string, updateUser): string {
        this.users.map(user => {
            if (user.id === +id) {
                if (updateUser.name) user.name = updateUser.name;
                if (updateUser.email) user.email = updateUser.email;
            }
        })
        return 'User updated';
    }

    removeUser(id: string): string {
        const userIndex = this.users.findIndex((item: any) => item.id === +id);
        if (userIndex >= 0) {
          this.users.splice(userIndex, 1);
        }
        return 'User deleted';
    }
}
