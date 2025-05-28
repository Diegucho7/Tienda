import { Usuario } from "./usuario.model";

export class Blog {

    constructor(
        public  IdBlog:      string,
        public category:    string,
        public title:       string,
        public subject:     string,
        public description: string,
        public image:       string,
        public  userId:      Usuario,
        public  name:      string,
        public  lastname:      string,
        public  createdAt:   Date
    ) { }

    
}
