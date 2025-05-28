import { environment } from "../../environments/environment";

const base_url = environment.base_url;

export class Usuario{
    map(arg0: (user: any) => { id: any; name: any; lastname: any; }): any {
      throw new Error('Method not implemented.');
    }

    constructor(
        public idUser: string,
        public email: string,
        public name: string,
        public lastname: string,

        public password?: string,

        public role?:string,
        public img?:string

    ){}


    get imagenUrl() {

      if(!this.img){
          return `${ base_url }/uploads/uploads/no-img.png`;

      }else if ( this.img?.includes('https') ) {
          return this.img;

      } else if ( this.img) {
          return `${ base_url }/uploads/usuarios/${ this.img }`;
      } else {
          return `${ base_url }/uploads/uploads/no-img.png`;
      }


  }


}
