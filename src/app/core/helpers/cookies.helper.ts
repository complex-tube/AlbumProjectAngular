export class CookiesHelper {
  static deleteCookie(cookieName: string): void {
    CookiesHelper.setCookie(cookieName, '', {
      'max-age': -1,
    });
  }

  static setCookie(name: string, value: string, options: JsonObject = {}): void {
    options = {
      path: '/',
      ...options,
    };
    if (options['max-age'] === undefined) {
      options['expires'] = new Date(Date.now() + 86400e3).toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  static getCookie(name: string): string | undefined {
    let matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  static hasCookie(name: string): boolean {
    return CookiesHelper.getCookie(name) !== undefined;
  }
}

interface JsonArray extends Array<JsonValue> {}

interface JsonObject {
  [key: string]: JsonValue;
}

declare type JsonPrimitive = string | number | boolean | null;
declare type JsonValue = JsonPrimitive | JsonArray | JsonObject | undefined;
