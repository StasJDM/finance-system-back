import { Controller, Get, Post, Body, Param, Request, Delete } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { AddCategoryDto } from '../dto/add-category.dto';

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

  @Get('month')
  findAndGroupByMonth(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findAndGroupByMonth(userId);
  }

  @Get('month/incoming')
  findIncomingAndGroupByMonth(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findIncomingAndGroupByMonth(userId);
  }

  @Get('month/outgoing')
  findOutgoingAndGroupByMonth(@Request() req) {
    const userId: string = req.user.id;
    return this.transactionService.findOutgoingAndGroupByMonth(userId);
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

  @Post(':transactionId/categories')
  addCategory(@Request() req, @Param('transactionId') transactionId: string, @Body() addCategoryDto: AddCategoryDto) {
    const userId: string = req.user.id;
    return this.transactionService.addCategory(userId, transactionId, addCategoryDto);
  }

  @Delete(':transactionId/categories/:categoryId')
  removeCategory(
    @Request() req,
    @Param('transactionId') transactionId: string,
    @Param('categoryId') categoryId: string,
  ) {
    const userId: string = req.user.id;
    return this.transactionService.removeCategory(userId, transactionId, categoryId);
  }
}
