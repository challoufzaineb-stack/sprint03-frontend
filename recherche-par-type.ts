import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';
import { VoyageService } from '../services/voyage.service';

@Component({
  selector: 'app-recherche-par-type',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-type.html',
  styles: ``
})
export class RechercheParType implements OnInit {
  voyages!: Voyage[];
  types!: Type[];
  IdType!: number;

  constructor(
    private voyageService: VoyageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.voyageService.listeTypes().subscribe(t => {
      console.log(t);
      this.types = t._embedded.types;
      this.cdr.detectChanges();
    });
  }

  onChange() {
    this.voyageService.rechercherParType(Number(this.IdType)).subscribe(vys => {
      this.voyages = vys;
      this.cdr.detectChanges();
    });
  }
}