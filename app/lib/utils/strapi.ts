const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export function strapiClient(resource: string, method: 'POST'|'GET'|'PUT'|'DELETE' = 'GET', body?: any): Promise<Response> {
  let httpOptions: RequestInit = {
    method: method,
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`
    }
  };

  if (method === 'POST' || method === 'PUT') {
    httpOptions.body = JSON.stringify(body);
  }

  console.log(`${STRAPI_HOST}${resource}`);
  
  return fetch(`${STRAPI_HOST}${resource}`, httpOptions).then(res => res.json());
}