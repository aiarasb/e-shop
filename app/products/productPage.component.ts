import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Product } from './product';
import {ProductService} from "../services/product.service";
import {PurchaseService} from "../services/purchase.service";

@Component({
    moduleId: module.id,
    selector: 'product-page',
    templateUrl: 'productPage.component.html',
})

export class ProductPageComponent {

    product = new Product('', '', '', 0.0, 0, 0, []);

    private quantity = 0;

    private userId: any = null;

    constructor (
        private productService: ProductService,
        private purchaseService: PurchaseService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    getProduct(): void {
        this.route.params.forEach((params: Params) => {
            let name = params['name'];
            this.productService.getProductByName(name).subscribe(product => this.product = product);
        });
    }

    addToCart(productId : any, quantity : number): void {
        if (!this.quantity) {
            return;
        }

        this.purchaseService.createNewOrder(window.localStorage.getItem('userId')).then(() => {
            this.purchaseService.getActiveOrder(window.localStorage.getItem('userId')).then((response) => {
                var activeOrderId = response[0]._id;
                this.purchaseService.addPurchase(productId, activeOrderId, quantity);
            });
        });
    }

    ngOnInit(): void {
        this.userId = window.localStorage.getItem('userId');
        this.getProduct();
    }
}
