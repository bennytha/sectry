import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../shared/dataservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {};
  myForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private sdata: DataserviceService, private toastr:ToastrService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['',[ Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })
  }

  onsubmit(myForm: FormGroup) {
    this.login = {
      'email': this.myForm.value.email,
      'password': this.myForm.value.password
    }
    this.sdata.login(this.login).subscribe((token) => {      
      this.success();
      localStorage.setItem('login', JSON.stringify(token));
      this.router.navigate([{ outlets: { user: 'user' } }]);
    },(e)=>{
      console.log('error');
      
      this.error();
    });
  }

  register() {
    this.router.navigate([{ outlets: { user: 'register' } }]);
  }

  success(){
    this.toastr.success("login Success !");
  }

  error(){
    this.toastr.warning("login failed !");
  }
}

