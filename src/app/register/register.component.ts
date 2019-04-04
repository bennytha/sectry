import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../shared/dataservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userdeatails={};
  myForm:FormGroup;

  constructor(private sdata:DataserviceService, private fb:FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email:['', Validators.required],
      name:['', Validators.required],
      password:['', Validators.required]
    })
  }
  
  onsubmit(myform:FormGroup){    
    this.userdeatails={
      'name':myform.value.name,
      'email':myform.value.email,
      'password':myform.value.password
    }
    this.sdata.adduser(this.userdeatails).subscribe();
  }
}
