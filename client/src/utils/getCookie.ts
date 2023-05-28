export const  getCookie = (cookieName: string) => {
  var cookieList = document.cookie.split(';');
  for (var i = 0; i < cookieList.length; i++) {
    var cookie = cookieList[i].trim();
    var cookieParts = cookie.split('=');
    if (cookieParts[0] === cookieName) {
      return decodeURIComponent(cookieParts[1]);
    }
  }
  return null;
}
