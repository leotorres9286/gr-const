import { strapiClient } from "@/app/lib/utils/strapi";

export async function singIn(username: string, password: string) {
  const res = await strapiClient(`/user-apps?filters[username][$eq]=${username}&populate=role`, 'GET');

  if (res.ok) {
    const ret = await res.json();
    console.log(ret);
    
  }
}