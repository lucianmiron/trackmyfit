import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { PerformanceParamsDto } from './dto/performance-params.dto';

@Controller('activities')
export class ActivitiesController {
  private readonly logger = new Logger(ActivitiesController.name);

  constructor(private readonly activitiesService: ActivitiesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() activity: CreateActivityDto, @CurrentUser() user: UserDto) {
    return this.activitiesService.create(activity, parseInt(user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() user: UserDto): Promise<Activity[]> {
    return this.activitiesService.findAll(parseInt(user.id));
  }

  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('performance')
  calculatePerformance(
    @CurrentUser() user: UserDto,
    @Query() params: PerformanceParamsDto,
  ) {
    return this.activitiesService.calculatePerformance(
      parseInt(user.id),
      params,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @CurrentUser() user: UserDto,
  ): Promise<Activity> {
    // Validate that id is a number
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.activitiesService.findOne(id, parseInt(user.id));
  }
}
