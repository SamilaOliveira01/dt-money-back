import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';

@Controller('api/transaction')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createTransaction(@Body() data: CreateTransactionDTO) {
    const createdTransaction = await this.appService.createTransaction(data);
    return createdTransaction;
  }

  @Get('/')
  async getTransactions() {
    const transactions = await this.appService.getTransaction();
    return transactions;
  }

  @Get('/dashboard')
  async getDashboard() {
    const dashboard = await this.appService.getDashboard();
    return dashboard;
  }

  @Get('/:id')
  async getTransactionById(@Param('id') id: string) {
    const transaction = await this.appService.getTransactionById(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  @Put('/:id')
  async updateTransaction(
    @Body() data: UpdateTransactionDTO,
    @Param('id') id: string,
  ) {
    const updatedTransaction = await this.appService.updateTransaction(id, data);
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return updatedTransaction;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTransaction(@Param('id') id: string) {
    const deletedTransaction = await this.appService.deleteTransaction(id);
    if (!deletedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return;
  }
}
