// src/database/database.controller.ts
// testConnection() method
import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}

  @Get('test')
  async testConnection() {
    return this.databaseService.testDatabaseConnection();
  }
}
