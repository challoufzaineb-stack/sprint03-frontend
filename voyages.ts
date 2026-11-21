import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../services/voyage.service';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-voyages',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './voyages.html'
})
export class Voyages implements OnInit {
  voyages!: Voyage[];

  constructor(
    private voyageService: VoyageService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerVoyages();
  }

  chargerVoyages() {
    this.voyageService.listeVoyages().subscribe(vys => {
      console.log(vys);
      this.voyages = vys;
      this.cdr.detectChanges();
    });
  }

  supprimerVoyage(voy: Voyage) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.voyageService.supprimerVoyage(voy.idVoyage).subscribe(() => {
        console.log("Voyage supprimé");
        this.chargerVoyages();
      });
    }
  }
}