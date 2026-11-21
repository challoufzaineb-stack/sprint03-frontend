import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';
import { VoyageService } from '../services/voyage.service';

@Component({
  selector: 'app-add-voyage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-voyage.html',
})
export class AddVoyage implements OnInit {
  newVoyage = new Voyage();
  types!: Type[];
  newIdType!: number;

  constructor(
    private voyageService: VoyageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.voyageService.listeTypes().subscribe(t => {
      console.log(t);
      this.types = t._embedded.types;
      this.cdr.detectChanges();
    });
  }

  addVoyage() {
    this.newVoyage.type = this.types.find(t => t.idType == this.newIdType)!;
    this.voyageService.ajouterVoyage(this.newVoyage).subscribe(() => {
      this.router.navigate(['voyages']);
    });
  }
}