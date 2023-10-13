"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("../entities/note.entity");
let NotesService = exports.NotesService = class NotesService {
    constructor(notesRepo) {
        this.notesRepo = notesRepo;
    }
    getAll() {
        return this.notesRepo.find();
    }
    findOne(id) {
        return this.notesRepo.findOne({ where: { id } });
    }
    create(body) {
        const newNote = this.notesRepo.create(body);
        return this.notesRepo.save(newNote);
    }
    async update(id, body) {
        const note = await this.notesRepo.findOne({ where: { id } });
        this.notesRepo.merge(note, body);
        return this.notesRepo.save(note);
    }
    async delete(id) {
        await this.notesRepo.delete(id);
        return true;
    }
};
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotesService);
//# sourceMappingURL=notes.service.js.map