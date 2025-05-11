import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ActivitiesSeeder } from 'apps/activities/src/database/activities.seed';
import { UserSeeder } from 'apps/auth/src/database/seeds/user.seed';
import { DataSource } from 'typeorm';

@Injectable()
export class Seeder {
  constructor(
    private readonly userSeeder: UserSeeder,
    private readonly activitiesSeeder: ActivitiesSeeder,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async resetDatabase() {
    try {
      // Drop all tables
      await this.dataSource.dropDatabase();

      // Recreate all tables based on your entities
      await this.dataSource.synchronize();

      console.log('Database has been reset successfully');
      return true;
    } catch (error) {
      console.error('Error resetting database:', error);
      return false;
    }
  }

  async seed() {
    await this.resetDatabase();

    await this.userSeeder.seed();
    await this.activitiesSeeder.seed();

    console.log('Database seeding completed');
  }
}
