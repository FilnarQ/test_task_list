import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userList : {
    username: string;
    order: number[];
  }[];

  constructor() {
    this.userList = [
      {
        username: 'guest',
        order: [0]
      }
    ];
    //get users data from somewhere
  }

  getUserList(){
    return this.userList;
  }

  getUser(id: number){
  return this.userList[id];
  }

  addUser(_username: string, password: string)
  {
    //loading custom list order if user exists
    //in our case we always create new user
    this.userList.push({
      username: _username,
      order: new Array<number>
    });
  }

  updateOrder(id: number, _order:number[])
  {
    this.userList[id].order = _order;
  }
}
