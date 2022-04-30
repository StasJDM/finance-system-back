import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Request() req, @Body() createNoteDto: CreateNoteDto) {
    const userId: string = req.user.id;
    return this.noteService.create(userId, createNoteDto);
  }

  @Get()
  findAll(@Request() req) {
    const userId: string = req.user.id;
    return this.noteService.findAll(userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    const userId: string = req.user.id;
    return this.noteService.findOne(userId, id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const userId: string = req.user.id;
    return this.noteService.update(userId, id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const userId: string = req.user.id;
    return this.noteService.remove(userId, id);
  }
}
