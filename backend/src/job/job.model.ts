import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Job {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  company: string;

  @Field()
  location: string;

  @Field({ nullable: true })
  salary?: number;
  
  @Field(() => Int)
  userId: number;

  @Field()
  createdAt: Date;
}
