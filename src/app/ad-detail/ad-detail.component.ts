import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {

  ad: { id: '', title: '', description: '', author_name: '', created_at_datetime: '' };
  isLoadingResults = true;
  user: string = '';

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.getAdDetails(this.route.snapshot.params['id']);
  }

  getAdDetails(id) {
    this.ad = this.api.getAd(id);
    this.isLoadingResults = false;
  }

  deleteAd(id) {
    this.api.deleteAd(id);
    this.router.navigate(['/ads']);
  }

  clickMethod(id: string, title: string) {
    if (confirm("Are you sure to delete " + title + " wich id is " + id + " ?")) {
      this.deleteAd(id);
    }
  }

};
