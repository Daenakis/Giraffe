import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  adForm: FormGroup;
  id: string = '';
  title: string = '';
  description: string = '';

  // isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.adForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required]
    });
    this.getAd(this.route.snapshot.params['id']);
    console.log(this.adForm);
  }

  getAd(id) {
    var data = this.api.getAd(id)
    console.log(data);
    this.id = data.id;
    console.log(this.adForm);
    this.adForm.setValue({
      title: data.title,
      description: data.description
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateAd(this.id, form)
    this.router.navigate(['/user-details', this.id]);
  }

  userDetails() {
    this.router.navigate(['/user-details', this.id]);
  }

}
