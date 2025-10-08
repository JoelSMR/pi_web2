export interface Product{
id:number,
price:number,
name:string,
description:string,
category:string
};

export interface RequestProductToEdit{
id:number
newProduct:Product
}