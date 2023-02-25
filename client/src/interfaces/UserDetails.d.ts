
export default interface UserDetails{
  _id?: string,
  firstName?: string,
  lastName?: string,
  userName?: string,
  email?: string,
  friends?: Array<any>,
  location?: string,
  occupation?: string,
  profileViews?: number,
  currentLevel?: number,
  profilePicture?: string,
  status?: string,
  createdAt?: string,
  updatedAt?: string,
};