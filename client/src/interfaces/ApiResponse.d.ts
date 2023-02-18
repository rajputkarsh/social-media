export default interface CustomResponseBody {
  data?: { [key: string]: any };
  status: number;
  message: string;
  type: string;
}
