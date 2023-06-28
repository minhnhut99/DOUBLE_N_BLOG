import moment from 'moment';

export const removeCookies = (cookies: string[]) => {
  cookies.forEach((cookie) => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};
export const getCookie = (cookieName: string) => {
  var cookieList = document.cookie.split(';');
  for (var i = 0; i < cookieList.length; i++) {
    var cookie = cookieList[i].trim();
    var cookieParts = cookie.split('=');
    if (cookieParts[0] === cookieName) {
      return decodeURIComponent(cookieParts[1]);
    }
  }
  return null;
};
export const formatDate = (date: string | undefined, mode: number) => {
  if (mode == 1) {
    return moment(date).format('MMM Do YYYY');
  } else {
    return moment(date).format('MM/DD/YYYY');
  }
};
export const colorCategory = (c_name: string) => {
  const categoryColorMap: Record<string, string> = {
    Technology: 'color-technology',
    Lifes: 'color-life',
    Musics: 'color-music',
  };
  return categoryColorMap[c_name] || 'color-story';
};

export const countWords = (str: string) => {
  return str
    .trim()
    .split(/\s+/)
    .filter((word) => word !== '').length;
};

export const getTimePostRead = (str: string) => {
  const wordsPerMins = 200;
  const countWord = str
    .trim()
    .split(/\s+/)
    .filter((word) => word !== '').length;
  const timeRead = Math.ceil(countWord / wordsPerMins);
  return timeRead;
};
