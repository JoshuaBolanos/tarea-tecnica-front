import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ICategory} from "../../../interfaces";

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.scss'
})
export class CategoriesFormComponent {

  public fb: FormBuilder = inject(FormBuilder);
  @Input() categoryForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callUpdateMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  callSave() {
    let category: ICategory = {
      name: this.categoryForm.controls['name'].value,
      description: this.categoryForm.controls['description'].value
    }
    if(this.categoryForm.controls['id'].value) {
      category.id = this.categoryForm.controls['id'].value;
    }
    if(category.id) {
      this.callUpdateMethod.emit(category);
    } else {
      this.callSaveMethod.emit(category);
    }
  }

}
