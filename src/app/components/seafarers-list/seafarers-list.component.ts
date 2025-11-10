import { EmptyvaluePipe } from './../../core/pipes/emptyvalue.pipe';
import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SeafarersService } from '../../core/services/seafarers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Iseafarers } from '../../core/interfaces/iseafarers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seafarers-list',
  standalone: true,
  imports: [
    DatePipe ,
    EmptyvaluePipe,
    RouterLink
  ],
  templateUrl: './seafarers-list.component.html',
  styleUrl: './seafarers-list.component.css'
})
export class SeafarersListComponent  implements OnInit {


  // injection services to use in the component
  private readonly _SeafarersService = inject(SeafarersService) ;
  private readonly _DestroyRef = inject(DestroyRef) ;
  private readonly _ToastrService = inject(ToastrService) ;

  AllSeafarers:WritableSignal<Iseafarers[]> = signal([]) ;









  ngOnInit(): void {

    // all seafarers
    this._SeafarersService.getAllSeafarers().pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next:(res)=>{
        // console.log(res);
        this.AllSeafarers.set(res) ;

        // console.log(this.AllSeafarers());

      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })
  }



  // change Status seafarers

  changeStatus(Id: number | string, EmpId: number | string, status: number | string): void {
  this._SeafarersService.changeStatus(Id, EmpId, +status).subscribe({
    next: (res) => {
      console.log(res);

      if (res.ErrorMessage === "Saved Successfully") {
        this._ToastrService.success(res.ErrorMessage , "Seafarer Management System") ;
        this.AllSeafarers() ;
      }

    },
    error: (err: HttpErrorResponse) => {
      console.error(err);
    }
  });
}

}
