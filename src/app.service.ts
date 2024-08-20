import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTransaction(data: CreateTransactionDTO) {
    console.log('Received data for creation:', data);
    const createdTransaction = await this.prismaService.transaction.create({
      data: {
        title: data.title,
        price: data.price,
        category: data.category,
        type: data.type,
      },
    });
    console.log('Created transaction:', createdTransaction);
    return createdTransaction;
  }
  
  async getTransaction() {
    const transactions = await this.prismaService.transaction.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    return transactions;
  }

  async getTransactionById(id: string) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id: id,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async updateTransaction(id: string, data: UpdateTransactionDTO) {
    const updatedTransaction = await this.prismaService.transaction.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        price: data.price,
        category: data.category,
        type: data.type,
      },
    });

    return updatedTransaction;
  }

  async deleteTransaction(id: string) {
    await this.getTransactionById(id);

    const deletedTransaction = await this.prismaService.transaction.delete({
      where: {
        id: id,
      },
    });

    return deletedTransaction;
  }

  async getDashboard() {
    const transactions = await this.prismaService.transaction.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    const entries = transactions.reduce((total, item) => {
      if (item.type === 'entrada') {
        total += item.price;
      }
      return total;
    }, 0);

    const outcomes = transactions.reduce((total, item) => {
      if (item.type === 'saida') {
        total -= item.price;
      }
      return total;
    }, 0);

    const total = entries + outcomes;

    return {
      entrada: entries,
      saida: outcomes,
      total: total,
    };
  }
}
