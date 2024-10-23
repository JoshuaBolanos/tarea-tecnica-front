import {Component, inject, ViewChild} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ICategory} from "../../interfaces";
import {CategoriesListComponent} from "../../components/categories/categories-list/categories-list.component";
import {CategoriesFormComponent} from "../../components/categories/categories-form/categories-form.component";
import {CategoriesService} from "../../services/categories.service";
import {LoaderComponent} from "../../components/loader/loader.component";
import {ModalComponent} from "../../components/modal/modal.component";
import {PaginationComponent} from "../../components/pagination/pagination.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoriesFormComponent,
    CategoriesListComponent,
    LoaderComponent,
    ModalComponent,
    PaginationComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  public categoriesService: CategoriesService = inject(CategoriesService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addCategoriesModal') public addCategoriesModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  categoryForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
  })

  constructor() {
    this.categoriesService.search.page = 1;
    this.categoriesService.getAll();
  }

  saveOrder(category: ICategory) {
    this.categoriesService.save(category);
    this.modalService.closeAll();
  }

  callEdition(category: ICategory) {
    this.categoryForm.controls['id'].setValue(category.id ? JSON.stringify(category.id) : '');
    this.categoryForm.controls['name'].setValue(category.name ? category.name : '');
    this.categoryForm.controls['description'].setValue(category.description ? JSON.stringify(category.description) : '');
    this.modalService.displayModal('md', this.addCategoriesModal);
  }

  updateOrder(category: ICategory) {
    this.categoriesService.update(category);
    this.modalService.closeAll();
  }

}
