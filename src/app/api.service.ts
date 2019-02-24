import { Injectable } from '@angular/core';
import { InitLocal } from './init-local';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends InitLocal {

  constructor() {
    super();
    this.load();
  }

  getAds() {
    let ads = JSON.parse(localStorage.getItem('ad_list'));
    return ads;
  }

  getAd(id) {
    let ads = JSON.parse(localStorage.getItem('ad_list'));
    var target;
    for (let i = 0; i < ads.length; i++) {
      if (ads[i].id == id) {
        target = ads[i]
      }
    }
    return target
  }

  addAd(newAd) {
    let ads = JSON.parse(localStorage.getItem('ad_list'));
    // Add New Ad
    newAd.author_name = localStorage.getItem('user');
    newAd.created_at_datetime = this.getTime();
    newAd.id = parseInt(localStorage.getItem('newId'));
    localStorage.setItem('newId', newAd.id + 1)
    console.log(newAd)
    ads.push(newAd);
    // Set New Ads
    localStorage.setItem('ad_list', JSON.stringify(ads));
    return newAd.id
  }

  checkUser(form) {
    let data_user = JSON.parse(localStorage.getItem('user_list'));
    var status = '';
    var resultF = () => {
      for (let i = 0; i < data_user.length; i++) {
        if (data_user[i].username === form.username) {
          if (data_user[i].password === form.password) {
            localStorage.setItem('user', ('' + form.username))
            return 'OK'
          }
          return 'Wrong Pass'
        }
      }
      localStorage.setItem('user', form.username);
      return 'Not Found'
    }
    status = resultF();

    return status
  }


  deleteAd(id) {
    let ads = JSON.parse(localStorage.getItem('ad_list'));
    for (let i = 0; i < ads.length; i++) {
      if (ads[i].id == id) {
        ads.splice(i, 1);
      }
    }
    localStorage.setItem('ad_list', JSON.stringify(ads));
  }

  updateAd(id, ad) {
    let ads = JSON.parse(localStorage.getItem('ad_list'));

    for (let i = 0; i < ads.length; i++) {
      if (ads[i].id == id) {
        ads[i].title = ad.title;
        ads[i].description = ad.description;
      }
    }
    // Set New Todos
    localStorage.setItem('ad_list', JSON.stringify(ads));
  }

  getTime() {
    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    let t = new Date();
    let time = checkTime(t.getHours()) + ':' + checkTime(t.getMinutes()) + ':' + checkTime(t.getSeconds());
    let date = checkTime(t.getUTCDate()) + '.' + checkTime(t.getUTCMonth() + 1) + '.' + checkTime(t.getFullYear());
    let result = time + ' ' + date;
    return result;
  }
}
