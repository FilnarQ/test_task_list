import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  list:Map<number, string> = new Map();

  constructor() {
    this.list.set(0, 'Example');
    //get list data
  }

  addEl(text:string)
  {
    this.list.set(Date.now(),text);
  }
  editEl(id:number, text: string)
  {
    this.list.set(id,text);
  }
  deleteEl(id: number)
  {
    this.list.delete(id);
  }
  getList()
  {
    return this.list;
  }
}
