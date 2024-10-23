import {Component, inject, ViewChild} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {ModalService} from "../../services/modal.service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ICategory, IProduct} from "../../interfaces";
import {ProductService} from "../../services/product.service";
import {CategoriesListComponent} from "../../components/categories/categories-list/categories-list.component";
import {LoaderComponent} from "../../components/loader/loader.component";
import {ModalComponent} from "../../components/modal/modal.component";
import {PaginationComponent} from "../../components/pagination/pagination.component";
import {ProductsFormComponent} from "../../components/products/products-form/products-form.component";
import {ProductsListComponent} from "../../components/products/products-list/products-list.component";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [
        ProductsFormComponent,
        CategoriesListComponent,
        LoaderComponent,
        ModalComponent,
        PaginationComponent,
        ProductsListComponent,
        AsyncPipe
    ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {

    public productsService: ProductService = inject(ProductService);
    public categoriesService: CategoriesService = inject(CategoriesService);
    public modalService: ModalService = inject(ModalService);
    public authService: AuthService = inject(AuthService);
    @ViewChild('addProductsModal') public addProductsModal: any;
    public fb: FormBuilder = inject(FormBuilder);
    productForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        stock: ['', Validators.required],
        category: ['', Validators.required],
    })

    constructor() {
        this.productsService.search.page = 1;
        this.productsService.getAll();
        this.categoriesService.search.page = 1;
        this.categoriesService.getAll();
    }

    saveProduct(product: IProduct) {
        console.log('Producto: ', product);
        this.productsService.save(product);
        this.modalService.closeAll();
    }

    callEdition(product: IProduct) {
        this.productForm.controls['id'].setValue(product.id ? JSON.stringify(product.id) : '');
        this.productForm.controls['name'].setValue(product.name ? product.name : '');
        this.productForm.controls['description'].setValue(product.description ? JSON.stringify(product.description) : '');
        this.productForm.controls['price'].setValue(product.price ? JSON.stringify(product.price) : '');
        this.productForm.controls['stock'].setValue(product.stock ? JSON.stringify(product.stock) : '');
        this.productForm.controls['category'].setValue(product.category ? JSON.stringify(product.category) : '');
        this.modalService.displayModal('md', this.addProductsModal);
    }

    updateProduct(product: IProduct) {
        this.productsService.update(product);
        this.modalService.closeAll();
    }

}
