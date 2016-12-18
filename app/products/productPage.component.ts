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

    product = new Product('', '', '', 0.0, 0, 0, []);

    private quantity = 0;

    private userId : any = "13"; // will need to change later

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

        this.purchaseService.createNewOrder(this.userId).then(() => {
            this.purchaseService.getActiveOrder(this.userId).then((response) => {
                var activeOrderId = response[0]._id;
                this.purchaseService.addPurchase(productId, activeOrderId, quantity);
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
        this.getProduct();
    }
}
