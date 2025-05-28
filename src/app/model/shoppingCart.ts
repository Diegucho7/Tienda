export interface ShoppingCart {
    ok:           boolean;
    msg:          string;
    shoppingCart: ShoppingCartClass;
}

export interface ShoppingCartClass {
    IdCart:    string;
    idUser:    string;
    IdProduct: string;
    quantity:  number;
    price:     number;
    createdAt: Date;
}
export interface Shopp {
    ok:           boolean;
    msg:          string;
    shoppingCart: ShoppingCart[];
}

export interface ShoppingCart {
    IdCart:      string;
    quantity:    number;
    IdProduct:   string;
    code:        string;
    name:        string;
    marca:       string;
    category:    string;
    price:       number;
    stock:       null | string;
    description: string;
    image:       null | string;
}


export interface Total {
    ok:     boolean;
    orders: Order[];
    total:  number;
}

export interface Order {
    IdProduct:   string;
    nameProduct: string;
    price:       string;
    quantity:    number;
    total:       number;
}
