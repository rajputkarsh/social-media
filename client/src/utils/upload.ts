import { URL } from "../constants";

export const uploadFile = (file: File) => {
  
  const formData = new FormData();
  formData.append('files', file)

  return fetch(URL.UPLOAD_MEDIA(), 
    {
      method: "post",
      body: formData,      
    }
    );

}