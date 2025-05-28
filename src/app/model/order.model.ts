export interface Orden {
    ok:    boolean;
    msg:   string;
    orden: OrdenClass;
}

export interface OrdenClass {
    IdOrder:   string;
    idUser:    string;
    factura:   string;
    IdProduct: string;
    precio:    number;
    quantity:  number;
    subtotal:  number;
    iva:       number;
    desc:      number;
    total:     number;
    status:    number;
    method:    number;
    address:   string;
    phone:     number;
    createdAt: Date;
}
