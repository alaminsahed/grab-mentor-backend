// src/database/database.service.ts
// // testConnection() method
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async testDatabaseConnection(): Promise<string> {
    try {
      await this.connection.query('SELECT 1'); // Simple query to test connectivity
      return 'Connection successful!';
    } catch (error) {
      if (error.driverError && error.driverError.code === '28P01') {
        return 'Authentication failed: Check your username and password';
      } else if (
        error.driverError &&
        error.driverError.code === 'ECONNREFUSED'
      ) {
        return 'Connection refused: Check your host and port';
      } else {
        return `Failed to connect: ${error.message}`;
      }
    }
  }
}
