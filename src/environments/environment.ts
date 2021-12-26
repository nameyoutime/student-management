// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // firebase: {
  //   projectId: 'student-management-34f66',
  //   appId: '1:780534211012:web:ecad78d300835282e40491',
  //   storageBucket: 'student-management-34f66.appspot.com',
  //   locationId: 'asia-east1',
  //   apiKey: 'AIzaSyCYNwmqjT6M5Rfn-lv8fA75pB2U-PPq-vI',
  //   authDomain: 'student-management-34f66.firebaseapp.com',
  //   messagingSenderId: '780534211012',
  // },
  firebase: {
    apiKey: "AIzaSyCYNwmqjT6M5Rfn-lv8fA75pB2U-PPq-vI",
    authDomain: "student-management-34f66.firebaseapp.com",
    projectId: "student-management-34f66",
    storageBucket: "student-management-34f66.appspot.com",
    messagingSenderId: "780534211012",
    appId: "1:780534211012:web:74b1ef9a41b047f7e40491"
  },
  production: false,
  // URL:"https://student-management-server.vercel.app/api/"
  URL:"http://localhost:8080/api/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
