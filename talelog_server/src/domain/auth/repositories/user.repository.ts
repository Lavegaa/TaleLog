import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infra/services/prisma/prisma.service';

@Injectable()
export default class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByEmail(email: string) {

  }
}
