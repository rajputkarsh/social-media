
export default interface IUser {
  firstName     : String,
  lastName      : String,
  userName      : String,
  email         : String,
  password      : String,
  profilePicture: String,
  location      : String,
  occupation    : String,
  status?       : String,
}