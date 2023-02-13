
export default interface ReduxState {
  mode: string,
  user: {[key: string]: any} | null,
  token: string | null,
  posts: Array<{[key: string]: any}>,
};S