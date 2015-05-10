/**
 * Created by Main on 06/05/15.
 */

console.log(
  //replce(/[^A-Za-z0-9\s!?\u0000-\u0080\u0082]/g,'');
  "War of  !!&&%%%%  1945"
    .replace(/[^([A-Za-z0-9\ ]/g,'')
    .replace( /\s\s+/g, ' ' )
    .toLowerCase()
);
