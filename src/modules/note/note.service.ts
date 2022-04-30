import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(@InjectRepository(Note) private noteRepository: Repository<Note>) {}

  create(userId: string, createNoteDto: CreateNoteDto) {
    return this.noteRepository.save({ ...createNoteDto, ownerId: userId });
  }

  findAll(userId: string) {
    return this.noteRepository.find({ ownerId: userId });
  }

  findOne(userId: string, id: string) {
    return this.noteRepository.findOne(id, { where: { ownerId: userId } });
  }

  update(userId: string, id: string, updateNoteDto: UpdateNoteDto) {
    return this.noteRepository.update({ id, ownerId: userId }, updateNoteDto);
  }

  remove(userId: string, id: string) {
    return this.noteRepository.delete({ id, ownerId: userId });
  }
}
