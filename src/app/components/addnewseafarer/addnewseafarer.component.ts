import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SeafarersService } from '../../core/services/seafarers.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Ifillvendor } from '../../core/interfaces/ifillvendor';
import { Ifillemployee } from '../../core/interfaces/ifillemployee';

@Component({
  selector: 'app-addnewseafarer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addnewseafarer.component.html',
  styleUrl: './addnewseafarer.component.css',
})
export class AddnewseafarerComponent implements OnInit {


  vendors: WritableSignal<Ifillvendor[]> = signal([]);
  employess: WritableSignal<Ifillemployee[]> = signal([]);

  ngOnInit(): void {
    this._SeafarersService.FillEmployee().subscribe({
      next: (res) => {
        // console.log(res);
        this.employess.set(res) ;
        // console.log(this.employess());

      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    this._SeafarersService.FillVendor().subscribe({
      next: (res) => {
        // console.log(res);
        this.vendors.set(res) ;
        // console.log(this.vendors());

      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  // injection service here
  private readonly _SeafarersService = inject(SeafarersService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);

  // add seafarer details form

  seafarerDetailsForm: FormGroup = this._FormBuilder.group({
    // --- Main Entity ---
    entity: this._FormBuilder.group({
      PassPortIssueDate: [null],
      IDExPiryDate: [null],
      SeamanBookNO: [null],
      Remarks: [null],
      EmpId: [null, Validators.required],
      VisaSponsorId: [null, Validators.required],
      VisaIssueDate: [null],
      VisaExpiryDate: [null],
      NameOfSpouse: [null],
      NoOfChildren: [null],
      BodyWeight: [null],
      Height: [null],
      VisaUAEIdNO: [null],
      NearestAirport: [null],
      ResidenceNumber: [null],
      SkypeID: [null],
      PermanentAddressHomeCountry: [null],
      ContactNumberHomeCountry: [null],
      ContactNameAndNumberDuringEmergenciesUAE: [null],
      ContactNameAndNumberDuringEmergenciesHome: [null],
      SeamanIssueDate: [null],
      SeamanExpiryDate: [null],
      CicpaNO: [null],
      CicpaIssueDate: [null],
      CicpaExpiryDate: [null],
      Declaration: [null],
      SignedOffFromAShipDueToMedicalReason: [false],
      SignedOffFromAShipDueToMedicalReasonComment: [null],
      UndergoneAnyMdicalOperation: [false],
      UndergoneAnyMdicalOperationComment: [null],
      DoctorConsultation: [false],
      DoctorConsultationComment: [null],
      HealthOrDisabilityProblem: [false],
      HealthOrDisabilityProblemComment: [null],
      InquiryOrInvolvedMaritimeAccident: [false],
      InquiryOrInvolvedMaritimeAccidentComment: [null],
      LicenseSuspendedOrRevoked: [false],
      LicenseSuspendedOrRevokedComment: [null],
    }),

    // --- Arrays ---
    Qualifications: this._FormBuilder.array([]),
    Certificates: this._FormBuilder.array([]),
    Languages: this._FormBuilder.array([]),
    References: this._FormBuilder.array([]),
    WorkExperiences: this._FormBuilder.array([]),
  });

  // --- Helpers to get FormArrays ---
  get Qualifications() {
    return this.seafarerDetailsForm.get('Qualifications') as FormArray;
  }
  get Certificates() {
    return this.seafarerDetailsForm.get('Certificates') as FormArray;
  }
  get Languages() {
    return this.seafarerDetailsForm.get('Languages') as FormArray;
  }
  get References() {
    return this.seafarerDetailsForm.get('References') as FormArray;
  }
  get WorkExperiences() {
    return this.seafarerDetailsForm.get('WorkExperiences') as FormArray;
  }

  // --- Add Methods for Arrays ---
  addQualification() {
    const qualification = this._FormBuilder.group({
      DegreeOrCourse: [null, Validators.required],
      CourseIssueDate: [null],
      ExpiryDate: [null],
      MajorOrSubject: [null],
      University: [null],
      Country: [null],
      Type: [null],
    });
    this.Qualifications.push(qualification);
  }

  addCertificate() {
    const certificate = this._FormBuilder.group({
      Capacity: [null],
      Regulation: [null],
      IssueDate: [null],
      ExpiryDate: [null],
      IssuingAuthority: [null],
      Limitations: [null],
      Country: [null],
      Type: [null],
    });
    this.Certificates.push(certificate);
  }

  addLanguage() {
    const language = this._FormBuilder.group({
      Capacity: [null],
      Regulation: [null],
      IssueDate: [null],
      ExpiryDate: [null],
      IssuingAuthority: [null],
      Limitations: [null],
      Country: [null],
    });
    this.Languages.push(language);
  }

  addReference() {
    const reference = this._FormBuilder.group({
      PersonName: [null],
      CompanyName: [null],
      Country: [null],
      Fax: [null],
      EmailId: [null],
    });
    this.References.push(reference);
  }

  addWorkExperience() {
    const experience = this._FormBuilder.group({
      VesselName: [null],
      VesselType: [null],
      Rank: [null],
      From: [null],
      To: [null],
      GRT: [null],
      BHP: [null],
      CompanyName: [null],
    });
    this.WorkExperiences.push(experience);
  }

  // SaveSeafarer Submit

  SaveSeafarerSubmit() {
    if (this.seafarerDetailsForm.valid) {
      this._SeafarersService
        .addSeafarer(this.seafarerDetailsForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);


            if (res.ErrorMessage === "Saved Successfully") {

              this._ToastrService.success(res.ErrorMessage , "Seafarer Management System") ;

              setTimeout(() => {
                this._Router.navigate(["/seafarerslist"]) ;
              }, 1000);


            }
          },

          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
    } else {
      this.seafarerDetailsForm.markAllAsTouched();
    }
  }
}
