
export namespace UserRequest {

  interface Register{
    firstName: string,
    lastName : string,
    userName : string,
    email    : string,
    password : string,
  }

  interface Login{
    userIdentifier: string,
    password      : string,
  }
}