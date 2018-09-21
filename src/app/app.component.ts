import { Component } from '@angular/core';
import { NotesService } from './notes.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Note } from './note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;

  note: Note = new Note();
  notes: Array<Note> = [];
  constructor(public notesservice: NotesService) {}
  ngOnInit() {
    this.notesservice.getNotes().subscribe(
      data => {this.notes = data; },
      err => {this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'; }
    );
  }
  takeNotes() {
    if (this.note.title === '' || this.note.text === '') {
      this.errMessage = 'Title and Text both are required fields';
    } else {
      this.notes.push(this.note);
      this.notesservice.addNote(this.note).subscribe(
        data => {},
        err => {
          const index: number = this.notes.findIndex(note => note.title === this.note.title);
          this.notes.splice(index, 1);
          this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found';
        }
      );
      this.note = new Note();
    }
  }
}
