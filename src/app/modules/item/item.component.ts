import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Item } from 'src/app/model/item.model';
import { ItemService } from './service/item.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  itemForm!: FormGroup;
  items$!: Observable<Item[]>;
  loading$: Observable<boolean> = of(true);
  selectedItem?: Item;
  editMode?: boolean = false;

  @ViewChild('createItemModal') createItemModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    public modalService: NgbModal
  ) {
    this.formInitializer();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  submit(): void {
    if (!this.editMode) {
      this.saveItem()
    } else {
      this.updateItem();
    }
    this.closeModal();
    this.fetchData();
  }

  deleteItem(itemId: any): void {
    if (confirm('Are you sure you want to delete this Item?')) {
      this.itemService.deleteItem(itemId);
      this.fetchData();
    }
  }

  editItem(item: Item): void {
    this.selectedItem = item;
    this.editMode = true;
    this.itemForm.patchValue({ name: item.name });
    this.itemForm.patchValue({ sell: item.sell });
    this.itemForm.patchValue({ sold: item.sold });
    this.itemForm.patchValue({ soldDate: item.soldDate });
    this.modalService.open(this.createItemModal);
  }

  private saveItem(): void {
    const data = this.itemForm.getRawValue();
    this.itemService.saveItems(data);
  }

  private updateItem(): void {
    if (this.selectedItem) {
      this.selectedItem.name = this.itemForm.get('name')?.value;
      this.selectedItem.sell = this.itemForm.get('sell')?.value;
      this.selectedItem.sold = this.itemForm.get('sold')?.value;
      this.selectedItem.soldDate = this.itemForm.get('soldDate')?.value;
      this.itemService.updateItem(this.selectedItem);
      this.editMode = false;
    }
  }

  private fetchData(): void {
    this.items$ = this.itemService.getItems();
  }

  private formInitializer(): void {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      sell: [false],
      sold: ['', Validators.required],
      soldDate: ['']
    });
  }

  private closeModal(): void {
    this.modalService.dismissAll();
    this.resetForm();
  }

  private resetForm(): void {
    this.itemForm.reset();
  }

}
