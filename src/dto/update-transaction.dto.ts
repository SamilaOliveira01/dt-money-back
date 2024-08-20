export class UpdateTransactionDTO {
  title: string;
  price: number;
  category: string;
  type: 'entrada' | 'saida';
}