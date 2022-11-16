import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UsersService } from './services/users.service';
import { ListService } from './services/list.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list : Map<number,string> = new Map();
  userList : {
      username: string,
      order: Array<number>
    }[] = []
  user : {
    username: string,
    order: Array<number>
  };
  userID = 0;
  edit : number = -1;
  @Input() editText : string = ''
  @ViewChild("editor") editor!: ElementRef<HTMLInputElement>;
  constructor(private usersService: UsersService,
              private listService: ListService,
              public dialog: MatDialog)
  {
    this.getList();
    this.getUserList();
    this.user = this.userList[0]||{username:'guest', order:[0,1]};
  }
  showLoginDialog()
  {
    // this.addUser(prompt("login")||"login", prompt("pass")||"password");
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(result=>{
      if(result) this.addUser(result?.username||'empty', result?.password||'empty');
    })
  }

  getUserList()
  {
    this.userList = this.usersService.getUserList();
  }
  addUser(username:string, password:string)
  {
    this.usersService.addUser(username, password);
    this.getUserList();
  }
  changeUser(id:number)
  {
    this.user = this.userList[id];
    this.userID = id;
    this.normalizeOrder()
  }

  normalizeOrder(){
    for(let i=0;i<this.user.order.length;i++)
    {
      if(!this.list.has(this.user.order[i]))
      {
        this.user.order.splice(i,1);
      }
    }
    this.list.forEach((_value, key)=>{
      if((this.user.order.indexOf(key)==-1)||this.user.order.length==0)
      {
        this.user.order.push(key);
      }
    })
  }

  getList()
  {
    this.list = this.listService.getList();
  }
  setOrder()
  {
    this.usersService.updateOrder(this.userID, this.user.order);
  }
  addEl(text:string)
  {
    this.listService.addEl(text);
    this.getList();
    this.normalizeOrder();
    this.setOrder();
  }
  editEl(id:number,text:string)
  {
    this.listService.editEl(id,text);
    this.getList();
  }
  deleteEl(id:number)
  {
    this.listService.deleteEl(id);
    this.getList();
    this.normalizeOrder();
    this.setOrder();
  }

  editFocus()
  {
    setTimeout(()=>
    {
      this.editor.nativeElement.focus();
    })
  }
  tracker(id: any, elem: any)
  {
    return id;
  }
  drop(event: CdkDragDrop<string[]>)
  {
    moveItemInArray(this.user.order, event.previousIndex, event.currentIndex);
    this.setOrder();
  }
}
