import {Token} from '@angular/compiler';

export interface LoginForm{

  Username: string;
  Password: string;
    // remember: boolean;
}

export interface responseLogin{
  IsSuccess: Boolean;
  Mssg : string;
  token?: {
    value: string;
  };
}
