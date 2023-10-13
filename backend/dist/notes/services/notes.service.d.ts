import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
export declare class NotesService {
    private notesRepo;
    constructor(notesRepo: Repository<Note>);
    getAll(): Promise<Note[]>;
    findOne(id: number): Promise<Note>;
    create(body: any): Promise<Note[]>;
    update(id: number, body: any): Promise<Note>;
    delete(id: number): Promise<boolean>;
}
