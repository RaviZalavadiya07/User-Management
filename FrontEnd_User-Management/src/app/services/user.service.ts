import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:7135";
  http = inject(HttpClient);
  constructor() { }
  getAllUser(){
    return this.http.get<IUser[]>(this.apiUrl+"/api/User/getAllUser")
  }
  createUser(user:IUser){
    return this.http.post(this.apiUrl+"/api/User/addUser",user)
  }
  updateUser(userId:number,user:IUser){
    return this.http.put<IUser>(this.apiUrl+"/api/User/updateUserByID/"+userId,user);
  }
  getUserById(userId:string){
    return this.http.get<IUser>(this.apiUrl+"/api/User/getUserById/"+userId);
  }
  deleteUser(userId:number){
    return this.http.delete(this.apiUrl+"/api/User/deleteUserById/"+userId);
  }
  getPagination(pageNumber: number, pageSize: number, searchQuery: string = ''){
    let params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString());

  if (searchQuery) {
    params = params.set('searchQuery', searchQuery);
  }
    return this.http.get<IUser[]>(`${this.apiUrl}/api/User/getPagination`,{ params });
  }
}
