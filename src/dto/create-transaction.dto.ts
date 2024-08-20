export class CreateTransactionDTO {
  title: string;
  price: number;
  category: string;
  type: 'entrada' | 'saida';
}
