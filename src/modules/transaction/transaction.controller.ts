import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    createTransactionDto.id_from = req.user.id;
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findByUserId(userId);
  }

  @Get('/amount')
  findAmount(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findTransactionsAmount(userId);
  }

  @Get('/outgoing')
  findOutgoing(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findUserOutgoing(userId);
  }

  @Get('/outgoing/amount')
  findOutgoingAmount(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findOutgoingCount(userId);
  }

  @Get('/outgoing/top')
  findOutgoingTop(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findOutgoingTop(userId, 5);
  }

  @Get('/incoming/')
  findIncoming(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findUserIncoming(userId);
  }

  @Get('/incoming/amount')
  findIncomingAmount(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findIncomingCount(userId);
  }

  @Get('/incoming/top')
  findIncomingTop(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findIncomingTop(userId, 5);
  }

  @Get('/search')
  search(@Request() req) {
    const userId: string = req.user.id;
    const searchTerm = req.query.searchTerm;
    return this.transactionService.search(userId, searchTerm);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    const userId: string = req.user.id;
    return this.transactionService.findOne(userId, id);
  }
}
