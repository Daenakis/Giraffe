import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'author_name', 'created_at_datetime'];
  loginForm: FormGroup;
  username: string = '';
  password: string = '';
  data;
  signed: boolean = false;
  user: string = '';
  isLoadingResults: boolean = false;
  p: number = 1;
  login: string = '';
  pass: string = '';

  constructor(private api: ApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    if (this.user !== '') {
      this.signed = false
      this.displayedColumns.push('actions');
    } else {
      this.signed = true
    }
    this.data = this.api.getAds();
    this.loginForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    let status = this.api.checkUser(form);
    switch (status) {
      case 'OK':
        this.signed = false;
        this.isLoadingResults = true
        location.reload();
        break;
      case 'Wrong Pass':
        alert('Wrong Pass,sir')
        break;
      case 'Not Found':
        this.signed = false
        let user_data = JSON.parse(localStorage.getItem('user_list'));
        user_data.push(form);
        localStorage.setItem('user_list', JSON.stringify(user_data));
        this.isLoadingResults = true
        location.reload();
        break;
    }
  }

  logOut() {
    localStorage.setItem('user', '');
    this.signed = !this.signed;
    this.displayedColumns.pop();
  }

  deleteAd(id) {
    this.isLoadingResults = true;
    this.api.deleteAd(id);
    location.reload();
  }

  clickMethod(id: string, name: string) {
    if (confirm("Are you sure to delete " + name + " wich id is " + id + " ?")) {
      this.deleteAd(id);
    }
  }



}
