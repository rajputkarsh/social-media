import fileUpload from "express-fileupload";
import { MESSAGES } from "../../constants";
import firebaseFunctions from "../../utils/firebase";


class UploadController {
  async upload(file: any){
    try{
      if(!file) throw MESSAGES.ERROR.BAD_REQUEST;

      const uploadedFile = await firebaseFunctions.uploadMedia(`${new Date().getTime()}_${file['files']['name']}`, file['files']['data']
      );

      console.log(uploadedFile.ref.fullPath);
      return uploadedFile.ref.fullPath;
    } catch(error){
      throw error;
    }
  }
}

export default new UploadController();