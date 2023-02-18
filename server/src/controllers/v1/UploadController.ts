
import { MESSAGES } from "../../constants";
import firebaseFunctions from "../../utils/firebase";

class UploadController {
  async upload(file: any){
    try{
      if(!file) throw MESSAGES.ERROR.BAD_REQUEST;

      const uploadedFile = await firebaseFunctions.uploadMedia(`${new Date().getTime()}_${file['files']['name']}`, file['files']['data']);
      const filePath = await firebaseFunctions.fetchDownloadUrl(uploadedFile.ref.fullPath);
      return filePath;
    } catch(error){
      throw error;
    }
  }
}

export default new UploadController();