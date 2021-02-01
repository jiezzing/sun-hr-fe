import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = accessToken => {
  cookies.set('access_token', accessToken, { path: '/' });
}
