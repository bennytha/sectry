import { Component, OnInit } from '@angular/core';
import { SharedataService } from '../shared/sharedata.service';
import { DataserviceService } from '../shared/dataservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  newpost: boolean = false;
  post = {};
  userdetails: any;
  myForm: FormGroup;
  oldpost: any[];

  l

  constructor(private sharedata: SharedataService, private sdata: DataserviceService, private fb: FormBuilder, private toastr: ToastrService) {
    this.sdata.getpost().subscribe((data) => {
      this.oldpost = data;
    });
    
    this.userdetails = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.sharedata.currentMessage.subscribe(message => this.newpost = message);

    this.myForm = this.fb.group({
      post: ['', Validators.required]
    });
  }

  onsubmit(myForm: FormGroup) {
    this.userdetails = JSON.parse(localStorage.getItem('user'));
    let date = new Date();
    this.post = {
      'post': myForm.value.post,
      'creatorid': this.userdetails._id,
      'date': date,
      'name': this.userdetails.name
    }
    this.sdata.addPost(this.post).subscribe();
    myForm.reset();
    this.success();
    this.sdata.getpost().subscribe((data) => {
      console.log(data);      
      this.oldpost = data;
    });
  }

  // like(postid){
  //   this.userdetails = JSON.parse(localStorage.getItem('user'));
  //   if(this.userdetails.name!=''){
  //     if(this.userdetails.posts.lenght!=0){
  //       for(let i=0;i<this.userdetails.posts.lenght;i++){
  //         if(postid==this.userdetails.posts[i].postid){
  //           if(this.userdetails.post[i].like=='like'){
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  



  cancel() {
    this.newpost = false;
  }

  success() {
    this.toastr.success("Post added !")
  }
}
