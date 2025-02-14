import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobService } from './job.service';
import { Job } from './job.model';
import { UseGuards } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
//import { Job } from '@prisma/client';

import { AuthGuard } from '@nestjs/passport';

@Resolver(() => Job)
export class JobResolver {
  constructor(private jobService: JobService) {}

  @Query(() => [Job])
  async jobs() {
    return this.jobService.getJobs();
  }

  @UseGuards(AuthGuard('jwt'))
  @Mutation(() => Job)
  async createJob(@Args('createJobInput') createJobDto: CreateJobDto) {
    return this.jobService.createJob(createJobDto);
  }
}

