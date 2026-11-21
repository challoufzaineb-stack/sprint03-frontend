import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Type } from '../model/type.model';

@Component({
  imports: [FormsModule],
  selector: 'app-update-type',
  styleUrl: './update-type.css',
  templateUrl: './update-type.html',
})
export class UpdateType implements OnInit {
  @Input()
  type!: Type;

  @Input()
  ajout!: boolean;

  @Output()
  typeUpdated = new EventEmitter<Type>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateType ", this.type);
  }
  saveType() {
    this.typeUpdated.emit(this.type);
  }
}
