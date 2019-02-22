import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  adForm: FormGroup;
  title: string = '';
  description: string = '';
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.adForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    var newId = this.api.addAd(form);
    this.router.navigate(['/user-details', newId]);
  }
}
