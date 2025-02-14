import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async createJob(createJobDto: CreateJobDto) {
    return this.prisma.job.create({
      data: {
        title: createJobDto.title,
        description: createJobDto.description,
        company: createJobDto.company,
        location: createJobDto.location,
        salary: createJobDto.salary,
        userId: createJobDto.userId,  // Assuming you pass userId from logged-in user
      },
    });
  }

  async getJobs() {
    return this.prisma.job.findMany({
      include: { user: true }, // Include user details
    });
  }
}
