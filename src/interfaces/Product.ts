export interface Products {
    message:  string;
    products: Product[];
}

export interface Product {
    id?:         string;
    name:        string;
    description: string;
    price:       number;
    category:    string;
    imageUrl:    string;
}

export interface ProductResponse {
    _id:         string;
    name:        string;
    description: string;
    price:       number;
    category:    string;
    imageUrl:    string;
}
