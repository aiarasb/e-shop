import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Product } from './product';

@Component({
    moduleId: module.id,
    selector: 'editProduct-form',
    templateUrl: 'productForm.component.html',
    styleUrls: ['productForm.component.css']
})

export class EditProductComponent {

    product = new Product('', '', '', 0.0, 0, []);
    inputData = [
        {
            name:'cover image link',
            display: false
        }
    ];

    constructor (
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    addProductInput()
    {
        this.inputData.push({
            name: 'image link',
            display: true
        })
    }

    removeProductInput(event): void
    {
        let eventParent = event.target.parentNode;
        eventParent.parentNode.removeChild(eventParent);
    }

    getProduct(): void {
        this.route.params.forEach((params: Params) => {
            let name = params['name'];
            this.productService.getProductByName(name).subscribe(product => this.product = product);
        });
    }

    ngOnInit(): void {
        this.getProduct();
    }

    // addProduct(
    //     name: string,
    //     description: string,
    //     price: string,
    //     quantity: string,
    //     discount: string
    // ): void {
    //
    // }
    //
    // getPhotoLinks()
    // {
    //     let photos = <HTMLCollection>document.getElementsByClassName('photo-link-input');
    //
    //     if (!photos) {
    //         return [];
    //     }
    //
    //     let photosObj = [];
    //
    //     for(var i = 0; i < photos.length; i++)
    //     {
    //         let cover = 0;
    //         let link = (<HTMLInputElement>photos[i]).value;
    //
    //         if (i === 0) {
    //             cover = 1;
    //         }
    //         photosObj.push({
    //             link: link,
    //             main: cover
    //         });
    //     }
    //     return photosObj;
    // }

    gotoProductsPage(): void {
        this.router.navigate(['/products']);
    }
}
