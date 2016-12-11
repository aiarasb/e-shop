import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from './product';

@Component({
    moduleId: module.id,
    selector: 'addProduct-form',
    templateUrl: 'addProduct.component.html',
    styleUrls: ['addProduct.component.css']
})

export class addProductComponent {

    products: Product[];

    inputData = [
        {
            name:'cover image link',
            cover: true
        }
    ];

    constructor (
        private productService: ProductService,
        private router: Router
    ) {}

    addProductInput()
    {
        this.inputData.push({
            name: 'image link',
            cover: false
        })
    }

    removeProductInput(event): void
    {
        let eventParent = event.target.parentNode;
        eventParent.parentNode.removeChild(eventParent);
    }

    addProduct(
        name: string,
        description: string,
        price: string,
        quantity: string,
        discount: string
    ): void {
        if (!name) { return; }
        let data = {
            name: name,
            description: description,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            discount: parseFloat(discount),
            photos: this.getPhotoLinks()
        };
        console.log(data);
        this.productService.addProduct(data);
        this.router.navigate(['/products']);
    }

    getPhotoLinks()
    {
        let photos = <HTMLCollection>document.getElementsByClassName('photo-link-input');
        let photosObj = [];
        for(var i = 0; i < photos.length; i++)
        {
            let cover = 0;
            let link = (<HTMLInputElement>photos[i]).value;

            if (i === 0) {
                cover = 1;
            }
            photosObj.push({
                link: link,
                main: cover
            });
        }
        return photosObj;
    }
}
