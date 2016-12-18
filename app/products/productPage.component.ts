import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Product } from './product';
import {ProductService} from "../services/product.service";
import {PurchaseService} from "../services/purchase.service";

@Component({
    moduleId: module.id,
    selector: 'product-page',
    templateUrl: 'productPage.component.html',
    styleUrls: ['productPage.component.css']
})

export class ProductPageComponent {


    private errorMessage = false;
    product = new Product('', '', '', 0.0, 0, 0, [], []);
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
            this.productService.getProductByName(name).subscribe(product => {
                this.product = product;
                this.product.reducedPrice = this.productService.getReducedPrice(
                    this.product.price,
                    this.product.discount
                );
            });
        });
    }

    addToCart(productId : any, quantity : number): void {
        if (!this.quantity) {
            this.errorMessage = true;
            return;
        }

        this.purchaseService.createNewOrder(this.userId).then(() => {
            this.purchaseService.getActiveOrder(this.userId).then((response) => {
                let activeOrderId = response[0]._id;
                this.purchaseService.addPurchase(productId, activeOrderId, quantity).then(() => {
                    this.router.navigate(['/cart']);
                });
            });
        });
    }

    replaceMainImage(event): void {
        let eventNode = event.target;
        let eventImage = eventNode.getAttribute('src');
        let mainNode = document.getElementById('main-image');
        let mainImg = mainNode.getAttribute('src');
        mainNode.setAttribute('src', eventImage);
        eventNode.setAttribute('src', mainImg);
    }

    ngOnInit(): void {
        this.userId = window.localStorage.getItem('userId');
        this.getProduct();
    }
}
