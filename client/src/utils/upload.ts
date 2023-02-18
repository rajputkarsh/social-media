
export const uploadFile = (file: File) => {

  const URL = 'http://localhost:3001/api/upload';
  
  const formData = new FormData();
  formData.append('files', file)

  return fetch(URL, 
    {
      method: "post",
      body: formData,      
    }
    );

}