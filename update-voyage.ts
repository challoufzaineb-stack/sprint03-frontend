import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';
import { VoyageService } from '../services/voyage.service';

@Component({
  selector: 'app-update-voyage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './update-voyage.html',
})
export class UpdateVoyage implements OnInit {
  currentVoyage = new Voyage();
  types!: Type[];
  updatedTypeId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private voyageService: VoyageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.voyageService.listeTypes().subscribe(t => {
      console.log(t);
      this.types = t._embedded.types;
    });

    const id = this.activatedRoute.snapshot.params['id'];
    this.voyageService.consulterVoyage(id).subscribe(voy => {
      this.currentVoyage = voy;
      if (this.currentVoyage.dateDepart) {
        this.currentVoyage.dateDepart = this.datePipe.transform(
          this.currentVoyage.dateDepart,
          'yyyy-MM-dd'
        ) as any;
      }
      if (this.currentVoyage && this.currentVoyage.type) {
        this.updatedTypeId = this.currentVoyage.type.idType;
      }
    });
  }

  updateVoyage() {
    this.currentVoyage.type = this.types.find(t => t.idType == this.updatedTypeId)!;
    this.voyageService.updateVoyage(this.currentVoyage).subscribe(() => {
      this.router.navigate(['voyages']);
    });
  }
}