import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../shared/dataservice.service';
import { Router } from '@angular/router';
import { SharedataService } from '../shared/sharedata.service';
import { User } from "../model/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  npost: boolean = false;
  login: boolean = false;
  profile:User;
  constructor(private sdata: DataserviceService, private router: Router, private sharedata: SharedataService) {
    this.sdata.me().subscribe((data) => {
      this.profile = data;
      localStorage.setItem('user', JSON.stringify(this.profile));
    })
  }

  ngOnInit() {
    this.sharedata.currentMessage.subscribe(message => this.npost = message);
  }
  logout() {
    this.sdata.logout().subscribe();
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    this.router.navigate([{ outlets: { user: 'login' } }]);
  }

  newpost() {
    this.sharedata.changeMessage(true);
  }
}
