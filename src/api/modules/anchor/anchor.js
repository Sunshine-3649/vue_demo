import http from '@/api/http';
import * as url from '@/api/const';

export function apply(params) {
  return http.get(url.anchor.URL_APPLY, params);
}
