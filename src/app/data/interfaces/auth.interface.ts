export interface loginData {
    username: string;
    password: string;
}

export class loginUser {
  username: string;
  password: string;

  constructor(){
    this.username = '';
    this.password = '';
  }
}