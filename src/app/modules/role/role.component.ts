import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from './service/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roleForm!: FormGroup;
  roles$!: Observable<Role[]>;
  loading$: Observable<boolean> = of(true);
  selectedRole?: Role;
  editMode?: boolean = false;

  @ViewChild('createRoleModal') createRoleModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    public modalService: NgbModal
  ) {
    this.formInitializer();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  submit(): void {
    if (!this.editMode) {
      this.saveRole()
    } else {
      this.updateRole();
    }
    this.closeModal();
    this.fetchData();
  }

  deleteRole(roleId: any): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteItem(roleId);
      this.fetchData();
    }
  }

  editRole(role: Role): void {
    this.selectedRole = role;
    this.editMode = true;
    this.roleForm.patchValue({
      roleName: role.roleName
    });
    this.modalService.open(this.createRoleModal);
  }

  private saveRole(): void {
    const data = this.roleForm.getRawValue();
    this.roleService.saveItems(data);
  }

  private updateRole(): void {
    if (this.selectedRole) {
      this.selectedRole.roleName = this.roleForm.get('roleName')?.value;
      this.roleService.updateItem(this.selectedRole);
      this.editMode = false;
    }
  }
  

  private fetchData(): void {
    this.roles$ = this.roleService.getItems();
  }

  private formInitializer(): void {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required]
    });
  }

  private closeModal(): void {
    this.modalService.dismissAll();
    this.resetForm();
  }

  private resetForm(): void {
    this.roleForm.reset();
  }
}
