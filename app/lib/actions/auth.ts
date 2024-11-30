'use server'
import { singIn } from "../services/auth";
import { strapiClient } from "../utils/strapi";


// export async function authenticate(_currentState: unknown, formData: FormData) {
export async function authenticate(formData: FormData) {
  try {
    console.log(formData.get('username'), formData.get('password'));
    // if (!formData.get('username') || formData.get('username') === null || formData.get('password') || formData.get('password') === null) throw new Error({
    //   statusCode: 403,
    //   title: 'Invalid credentials'
    // });
    // singIn(formData.get('username')!.toString(), formData.get('password')!.toString());

    const username = formData.get('username');
    const password = formData.get('password');

    if (username || username !== null) {
      try {
        const user = await strapiClient(`/user-apps?filters[username][$eq]=${username.toString()}&populate=role`);
        console.log(user, user.data[0].role);
        
    
        
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

  } catch (error) {
    // if (error) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.'
    //     default:
    //       return 'Something went wrong.'
    //   }
    // }
    throw error
  }
}