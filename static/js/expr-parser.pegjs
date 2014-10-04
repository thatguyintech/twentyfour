start
  = additive

additive
  = left:multiplicative right:(("+" / "-") multiplicative)*
    { return (function (arr) {
                 var total = 0;
                 for (var i = 0; i < arr.length; i++) {
                     if (arr[i][0] == '-') {
                         total -= arr[i][1];
                     } else {
                         total += arr[i][1];
                     }
                 }
                 return total;
              })(right) + left; }
  / multiplicative

multiplicative
  = left:primary right:(("*" / "/") primary)*
    { return (function (arr) {
                  var product = 1;
                  for (var i = 0; i < arr.length; i++) {
                      if (arr[i][0] == '/') {
                          product /= arr[i][1];
                      } else {
                          product *= arr[i][1];
                      }
                  }
                  return product;
              })(right) * left; }
  / primary

primary
  = integer
  / "(" s:start ")" { return s; }

integer "integer"
  = digits:[1-9] { return parseInt(digits, 10); }

