import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { User } from './model/user.model';
import { Role } from 'src/app/model';
import { UserService } from './services/item.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  user$!: Observable<User[]>;
    roles$!: Observable<Role[]>;
  loading$: Observable<boolean> = of(true);
  selectedUser?: User;
  editMode?: boolean = false;

  @ViewChild('createUserModal') createUserModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public modalService: NgbModal
  ) {
    this.formInitializer();
  }

  ngOnInit(): void {
    this.fetchData();
    this.fetchRoles();
  }

  submit(): void {
    if (!this.editMode) {
      this.saveRole()
    } else {
      this.updateUser();
    }
    this.closeModal();
    this.fetchData();
  }

  deleteUser(userId: any): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.userService.deleteItem(userId);
      this.fetchData();
    }
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.editMode = true;
    this.userForm.patchValue({ userName: user.userName });
    this.userForm.patchValue({ password: user.password });
    this.userForm.patchValue({ role: user.role });
    this.modalService.open(this.createUserModal);
  }

  private saveRole(): void {
    const data = this.userForm.getRawValue();
    this.userService.saveItems(data);
  }

  private updateUser(): void {
    if (this.selectedUser) {
      this.selectedUser.userName = this.userForm.get('userName')?.value;
      this.selectedUser.role = this.userForm.get('role')?.value;
      this.userService.updateItem(this.selectedUser);
      this.editMode = false;
    }
  }

  private fetchData(): void {
    this.user$ = this.userService.getItems();
  }

  private fetchRoles(): void {
    this.roles$ = this.userService.getRoleItems();
  }

  private formInitializer(): void {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  private closeModal(): void {
    this.modalService.dismissAll();
    this.resetForm();
  }


  private resetForm(): void {
    this.userForm.reset();
  }

}
