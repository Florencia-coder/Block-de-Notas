import { NotesService } from '../services/notes.service';
export declare class NotesController {
    private notesService;
    constructor(notesService: NotesService);
    getNotes(): Promise<import("../entities/note.entity").Note[]>;
    getNote(id: number): Promise<import("../entities/note.entity").Note>;
    postNote(body: any): Promise<import("../entities/note.entity").Note[]>;
    putNote(id: number, body: any): Promise<import("../entities/note.entity").Note>;
    deleteNote(id: number): Promise<boolean>;
}
