import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {IProduct} from "../../../interfaces";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  @Input() authService!: AuthService;
  @Input() title: string  = '';
  @Input() products: IProduct[] = [];
  @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
}
