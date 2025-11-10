import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { single } from 'rxjs';
import { SeafarersService } from '../../core/services/seafarers.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editseafarer',
  standalone: true,
  imports: [
    ReactiveFormsModule ,

  ],
  templateUrl: './editseafarer.component.html',
  styleUrl: './editseafarer.component.css'
})
export class EditseafarerComponent  implements OnInit {

  // injection services here
  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _Router = inject(Router) ;
  private readonly _ToastrService = inject(ToastrService) ;
  private readonly _ActivatedRoute = inject(ActivatedRoute) ;
  private readonly _SeafarersService = inject(SeafarersService) ;


  seafarerId:WritableSignal<string|number |null> = signal("") ;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        // console.log(p.get("id"));
        this.seafarerId.set(p.get("id")) ;
        this.EditSeafarerForm.get('entity.Id')?.setValue(+this.seafarerId);



      }
    })
  }



  EditSeafarerForm :FormGroup = this._FormBuilder.group({


      entity: this._FormBuilder.group({
        Id: [0, Validators.required],
        PassPortIssueDate: [''],
        IDExPiryDate: [''],
        SeamanBookNO: [''],
        Remarks: [''],
        EmpId: [null, Validators.required],
        VisaSponsorId: [null],
        VisaIssueDate: [''],
        VisaExpiryDate: [''],
        NameOfSpouse: [''],
        NoOfChildren: [null],
        BodyWeight: [null],
        Height: [null],
        VisaUAEIdNO: [''],
        NearestAirport: [''],
        ResidenceNumber: [''],
        SkypeID: [''],
        PermanentAddressHomeCountry: [''],
        ContactNumberHomeCountry: [''],
        ContactNameAndNumberDuringEmergenciesUAE: [''],
        ContactNameAndNumberDuringEmergenciesHome: [''],
        SeamanIssueDate: [''],
        SeamanExpiryDate: [''],
        CicpaNO: [''],
        CicpaIssueDate: [''],
        CicpaExpiryDate: [''],
        Declaration: [''],
        SignedOffFromAShipDueToMedicalReason: [false],
        SignedOffFromAShipDueToMedicalReasonComment: [''],
        UndergoneAnyMdicalOperation: [null],
        UndergoneAnyMdicalOperationComment: [''],
        DoctorConsultation: [null],
        DoctorConsultationComment: [''],
        HealthOrDisabilityProblem: [null],
        HealthOrDisabilityProblemComment: [''],
        InquiryOrInvolvedMaritimeAccident: [false],
        InquiryOrInvolvedMaritimeAccidentComment: [''],
        LicenseSuspendedOrRevoked: [false],
        LicenseSuspendedOrRevokedComment: ['']
      }),

      Qualifications: this._FormBuilder.array([]),
      Certificates: this._FormBuilder.array([]),
      Languages: this._FormBuilder.array([]),
      References: this._FormBuilder.array([]),
      WorkExperiences: this._FormBuilder.array([])
    });



  // عشان تعبي فورم أرايز من بيانات
  private createQualification(qualification: any): FormGroup {
    return this._FormBuilder.group({
      DegreeOrCourse: [qualification.DegreeOrCourse || ''],
      CourseIssueDate: [qualification.CourseIssueDate || ''],
      ExpiryDate: [qualification.ExpiryDate || ''],
      MajorOrSubject: [qualification.MajorOrSubject || ''],
      University: [qualification.University || ''],
      Country: [qualification.Country || ''],
      Type: [qualification.Type || null]
    });
  }

  private createCertificate(certificate: any): FormGroup {
    return this._FormBuilder.group({
      Capacity: [certificate.Capacity || ''],
      Regulation: [certificate.Regulation || ''],
      IssueDate: [certificate.IssueDate || ''],
      ExpiryDate: [certificate.ExpiryDate || ''],
      IssuingAuthority: [certificate.IssuingAuthority || ''],
      Limitations: [certificate.Limitations || ''],
      Country: [certificate.Country || ''],
      Type: [certificate.Type || null]
    });
  }

  private createLanguage(language: any): FormGroup {
    return this._FormBuilder.group({
      Capacity: [language.Capacity || ''],
      Regulation: [language.Regulation || ''],
      IssueDate: [language.IssueDate || ''],
      ExpiryDate: [language.ExpiryDate || ''],
      IssuingAuthority: [language.IssuingAuthority || ''],
      Limitations: [language.Limitations || ''],
      Country: [language.Country || '']
    });
  }

  private createReference(reference: any): FormGroup {
    return this._FormBuilder.group({
      PersonName: [reference.PersonName || ''],
      CompanyName: [reference.CompanyName || ''],
      Country: [reference.Country || ''],
      Fax: [reference.Fax || ''],
      EmailId: [reference.EmailId || '']
    });
  }

  private createWorkExperience(workExp: any): FormGroup {
    return this._FormBuilder.group({
      VesselName: [workExp.VesselName || ''],
      VesselType: [workExp.VesselType || ''],
      Rank: [workExp.Rank || ''],
      From: [workExp.From || ''],
      To: [workExp.To || ''],
      GRT: [workExp.GRT || ''],
      BHP: [workExp.BHP || ''],
      CompanyName: [workExp.CompanyName || '']
    });
  }

  // دالة تعبي الفورم بالكامل من البيانات
  fillForm(data: any) {
    // تعبي الحقول داخل entity
    this.EditSeafarerForm.get('entity')?.patchValue(data.entity);

    // تعبي Qualifications
    const qualArray = this.EditSeafarerForm.get('Qualifications') as FormArray;
    qualArray.clear();
    data.Qualifications.forEach((q: any) => {
      qualArray.push(this.createQualification(q));
    });

    // تعبي Certificates
    const certArray = this.EditSeafarerForm.get('Certificates') as FormArray;
    certArray.clear();
    data.Certificates.forEach((c: any) => {
      certArray.push(this.createCertificate(c));
    });

    // تعبي Languages
    const langArray = this.EditSeafarerForm.get('Languages') as FormArray;
    langArray.clear();
    data.Languages.forEach((l: any) => {
      langArray.push(this.createLanguage(l));
    });

    // تعبي References
    const refArray = this.EditSeafarerForm.get('References') as FormArray;
    refArray.clear();
    data.References.forEach((r: any) => {
      refArray.push(this.createReference(r));
    });

    // تعبي WorkExperiences
    const workExpArray = this.EditSeafarerForm.get('WorkExperiences') as FormArray;
    workExpArray.clear();
    data.WorkExperiences.forEach((w: any) => {
      workExpArray.push(this.createWorkExperience(w));
    });
  }


  SaveEdit() {

    if (this.EditSeafarerForm.valid) {

      this._SeafarersService.EditSeafarer(this.EditSeafarerForm.value).subscribe({
        next:(res)=>{
          // console.log(res);

          if (res.ErrorMessage === "Saved Successfully") {

            this._ToastrService.success(res.ErrorMessage , "Seafarer Management System") ;
            setTimeout(() => {
              this._Router.navigate(["/seafarerslist"]) ;
            }, 1000);



          }

        },

        error:(err:HttpErrorResponse)=>{
          console.log(err);

        }
      })
    }
  }



  }




