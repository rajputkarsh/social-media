
export const fetchInterceptor = () => {
  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
    let [resource, config] = args;
  
    let response = await originalFetch(resource, config);
  
    // handle unauthorised requests
    if(response.status == 401){
      const location = window.location.href;
      window.location.replace(`${import.meta.env.VITE_BASE_URL}/login?redirect=${location}`)
    }

    return response;
  };
};

export default fetchInterceptor;
