import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(@Body() activity: CreateActivityDto) {
    return this.activitiesService.create(activity);
  }

  @Get()
  findAll(): Promise<Activity[]> {
    return this.activitiesService.findAll();
  }

  @Get('/health')
  healthCheck() {
    return { status: 'ok' };
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Activity> {
    return this.activitiesService.findOne(id);
  }
}
