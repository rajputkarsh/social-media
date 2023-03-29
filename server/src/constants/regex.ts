
const PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[`~(){}+|':;.<>,=_#?!@$%^&*-]).{6,100}$/;
const MONGODB_ID = /^[a-f\d]{24}$/i;

export default {
  PASSWORD,
  MONGODB_ID
}