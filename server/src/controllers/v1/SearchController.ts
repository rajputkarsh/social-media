import { postDao, userDao } from "../../dao";

class SearchController{
  async find(term: string){
    try{
      const result = await Promise.allSettled([
        userDao.search(term),
        postDao.search(term),
      ]);

      return result;
    } catch(error){
      throw error;
    }
  }
}

export default new SearchController();