import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@app/common/database/entities';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserSeeder {
  constructor(private dataSource: DataSource) {}

  async seed() {
    const userRepository = this.dataSource.getRepository(User);

    const users = [
      {
        email: 'mironlucianv@gmail.com',
        password: await bcrypt.hash('Vasile94!', 10),
      },
    ];

    await userRepository.save(users);
  }
}
