import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../services/voyage.service';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-nom.html'
})
export class RechercheParNom implements OnInit {
  voyages!: Voyage[];
  nomVoyage!: string;

  constructor(
    private voyageService: VoyageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.voyageService.listeVoyages().subscribe(vys => {
      this.voyages = vys;
      this.cdr.detectChanges();
    });
  }

  rechercherVoyages() {
    this.voyageService.rechercherParNom(this.nomVoyage).subscribe(vys => {
      this.voyages = vys;
      this.cdr.detectChanges();
    });
  }
}