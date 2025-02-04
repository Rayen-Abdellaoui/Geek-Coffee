import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './entity/table.entity';


@Injectable()
export class TableInitializerService implements OnModuleInit {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async onModuleInit() {
    await this.initializeTables();
  }

  async initializeTables(): Promise<void> {
    const existingTables = await this.tableRepository.find();
    if (existingTables.length === 0) {
      await this.tableRepository.save(TABLES);
    }
  }
}

export const TABLES: Partial<Table>[] = [
  { id: 1, number: 1, category: "Playstation" },
  { id: 2, number: 2, category: "Playstation" },
  { id: 3, number: 3, category: "Playstation" },
  { id: 4, number: 4, category: "Playstation" },
  { id: 5, number: 5, category: "Playstation" },
  { id: 6, number: 6, category: "Card & Board Games" },
  { id: 7, number: 7, category: "Card & Board Games" },
  { id: 8, number: 8, category: "Card & Board Games" },
  { id: 9, number: 9, category: "Billard Table" },
  { id: 10, number: 10, category: "Billard Table" },
  { id: 11, number: 11, category: "Billard Table" },
  { id: 12, number: 12, category: "Billard Table" },
  { id: 13, number: 13, category: "Arcade" },
  { id: 14, number: 14, category: "Arcade" },
  { id: 15, number: 15, category: "Arcade" },
];
