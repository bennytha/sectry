import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from '../shared/dataservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userdeatails = {};
  myForm: FormGroup;

  constructor(private sdata: DataserviceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    this.router.navigate([{ outlets: { user: 'login' } }])
  }

  onsubmit(myform: FormGroup) {
    this.userdeatails = {
      'name': myform.value.name,
      'email': myform.value.email,
      'password': myform.value.password
    }
    this.sdata.adduser(this.userdeatails).subscribe((token) => {      
      if (token) {
        this.showToaster();
        localStorage.setItem('login', JSON.stringify(token));
        this.router.navigate([{ outlets: { user: 'user' } }]);
      }
    },
      (e) => {
        console.log('registertion Failed');
        this.errorToaster();

      }
    );
  }

  showToaster() {
    this.toastr.success("Registeration Success !");
  }
  errorToaster() {
    this.toastr.warning("Registertion Failed ! , Check Email")
  }
}
