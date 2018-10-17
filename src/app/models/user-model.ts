
export namespace UserModel {


  export interface LoginData {

    status: boolean;
    token: string;
    userinfo: {
      name: string;
      displayName: string;
      emailAddress: string;
      avatarUrls: string;
    };
    isAdmin:string;

  }

  export interface UserData {

    name: string;
    displayName: string;
    emailAddress: string;
    avatarUrls: string;


  }

}

