import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
  ) {
    await this.authService.register(email, password, name);
    return 'User registered successfully';
  }

  @Mutation(() => String)
  async login(@Args('email') email: string, @Args('password') password: string) {
    const { token } = await this.authService.login(email, password);
    return token;
  }
}
