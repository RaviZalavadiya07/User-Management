import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UserService } from '../../services/user.service';
import { IUser } from '../../Interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatSelectModule,MatButtonModule,MatRadioModule,MatDatepickerModule,ReactiveFormsModule,CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  readonly startDate = new Date(2000, 0, 1);
  formbuilder = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userForm = this.formbuilder.group({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^-?([a-zA-Z][a-zA-Z ]+)?$/)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^-?([a-zA-Z][a-zA-Z ]+)?$/)
    ]),
    email : new FormControl('',[
      Validators.required,
      Validators.pattern( /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
    ]),
    dateofBorth : new FormControl('',[
      Validators.required,
      this.noFutureDate
    ]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/) 
    ]),
    state: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required,
    ]),
    gender: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2) 
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      // this.passwordsMatch
    ])

  });


  save(){
    const user : IUser = {
      firstName : this.userForm.value.firstName!,
      lastName : this.userForm.value.lastName!,
      email : this.userForm.value.email!,
      dateofBorth : this.userForm.value.dateofBorth!,
      phoneNo : this.userForm.value.phoneNo!,
      state : this.userForm.value.state!,
      city : this.userForm.value.city!,
      gender : this.userForm.value.gender!,
      password : this.userForm.value.password!  
    };
    if(this.isEdit){
      this.userService.updateUser(Number(this.userId),user).subscribe(()=>{
        this.router.navigateByUrl("/user-list");
      })
    }else{
      this.userService.createUser(user).subscribe(()=>{
        this.router.navigateByUrl("/user-list");
      })
    }
   
  }
userId!:string;
isEdit=false;
  ngOnInit(): void {
   this.userId= this.route.snapshot.params['id']
   if(this.userId){
    this.isEdit=true;
    this.userService.getUserById(this.userId).subscribe(result=>{
      this.userForm.patchValue(result);
    })
   }
  }

  noFutureDate(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate > currentDate ? { futureDate: true } : null;
  }
}
