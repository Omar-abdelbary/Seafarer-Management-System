import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {


  const _PLATFORM_ID = inject(PLATFORM_ID);

   if (isPlatformBrowser(_PLATFORM_ID)) {



     if (localStorage.getItem('App_Token') !== null) {

        req = req.clone({ setHeaders: { Authorization: `Bearer ${localStorage.getItem("App_Token")}` }});

    }

  }

  return next(req);
};
