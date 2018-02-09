!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.mutator=n():(t.hydux=t.hydux||{},t.hydux.mutator=n())}("undefined"!=typeof self?self:this,function(){return function(t){function n(e){if(r[e])return r[e].exports;var u=r[e]={i:e,l:!1,exports:{}};return t[e].call(u.exports,u,u.exports,n),u.l=!0,u.exports}var r={};return n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=3)}([function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.isSet=function(t){return void 0!==t&&null!==t},n.isFn=function(t){return"function"==typeof t},n.isPojo=function(t){return!n.isSet(t.constructor)||t.constructor===Object},n.error=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return console.error.apply(console,["[hydux-mutator]"].concat(t))},n.isObj=function(t){return"object"==typeof t&&t}},,,function(t,n,r){"use strict";function e(t){void 0===t&&(t=50),y=new h.default({maxSize:t})}function u(t){if(v.isPojo(t))return p({},t);var n=t.shallowClone;if(v.isFn(n))return n.call(t);for(var r=new t.constructor,e=Object.keys(t),u=e.length;u--;){var o=e[e.length-1-u];r[o]=t[o]}return r}function o(t,n){if(void 0===n&&(n=[]),!v.isFn(t))return t;var r=t.toString(),e=y.get(r);if(e){for(var u=e.dynamicKeys.length,o=0;o<u;o++)e.keys[e.dynamicKeys[o]]=n[o];return e.keys}var i=[],a=null;try{a=g(r)}catch(t){throw v.error("parse accessor failed, accessor:",r),t}for(var c=a.keyPath.length,s=[],f=0,o=0;o<c;o++){var l=a.keyPath[o];"string"===l.type||"number"===l.type?i[o]=l.value:"variable"===l.type&&(i[o]=n[f++],s.push(o))}return y.set(r,{keys:i,dynamicKeys:s}),i}function i(t,n,r){t=t||{};var e=t.set;if(v.isFn(e))return e.call(t,n,r);var o=u(t);return o[n]=r,o}function a(t,n,r,e,u){for(var a=r===m.updateIn,c=o(n,u),s=c.length-1,f=t,l=[t],p=0;p<s;p++){var h=c[p];l.push(f=f[h]||{})}for(var d=a?e(l[s][c[s]]):e,p=s;p>=0;p--)f=l[p],d=i(f,c[p],d);return d}function c(t,n,r){var e=t,u=o(n,r);if(v.isFn(t.getIn))return t.getIn(u);for(var i=u.length,a=0;a<i;a++){var c=u[a];e=v.isObj(e)?v.isFn(e.get)?e.get(c):e[c]:void 0}return e}function s(t,n,r,e){return a(t,n,m.setIn,r,e)}function f(t,n,r){return a(t,n,m.setIn,void 0,r)}function l(t,n,r,e){return r?a(t,n,m.updateIn,r,e):t}var p=this&&this.__assign||Object.assign||function(t){for(var n,r=1,e=arguments.length;r<e;r++){n=arguments[r];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(t[u]=n[u])}return t};Object.defineProperty(n,"__esModule",{value:!0});var h=r(4),d=r(5),v=r(0),y=new h.default({maxSize:50}),g=function(t){return d.default.accessor.tryParse(t)};n.setCacheSize=e;var m;!function(t){t[t.setIn=1]="setIn",t[t.updateIn=2]="updateIn"}(m||(m={})),n.getIn=c,n.setIn=s,n.unsetIn=f,n.updateIn=l,n.default={setIn:s,unsetIn:f,updateIn:l}},function(t,n,r){"use strict";var e=this&&this.__assign||Object.assign||function(t){for(var n,r=1,e=arguments.length;r<e;r++){n=arguments[r];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(t[u]=n[u])}return t};Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function t(t){if(this.maxSize=0,this.cache={},this.oldCache={},this._size=0,t=e({},t),!(t.maxSize&&t.maxSize>0))throw new TypeError("`maxSize` must be a number greater than 0");this.maxSize=t.maxSize}return t.prototype._set=function(t,n){this.cache[t]=n,++this._size>=this.maxSize&&(this._size=0,this.oldCache=this.cache,this.cache={})},t.prototype.get=function(t){if(void 0!==this.cache[t])return this.cache[t];if(void 0!==this.oldCache[t]){var n=this.oldCache[t];return this._set(t,n),n}},t.prototype.set=function(t,n){return void 0!==this.cache[t]?this.cache[t]=n:this._set(t,n),this},t.prototype.has=function(t){return void 0!==this.cache[t]||void 0!==this.oldCache[t]},t.prototype.delete=function(t){delete this.cache[t]&&this._size--,delete this.oldCache[t]},t}();n.default=u},function(t,n,r){"use strict";function e(t){return i.string(t).thru(u)}function u(t){return t.skip(a)}function o(t){var n={b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"};return t.replace(/\\(u[0-9a-fA-F]{4}|[^u])/,function(t,r){var e=r.charAt(0),u=r.slice(1);return"u"===e?String.fromCharCode(parseInt(u,16)):n.hasOwnProperty(e)?n[e]:e})}Object.defineProperty(n,"__esModule",{value:!0});var i=r(6),a=i.regexp(/\s*/m);n.default=i.createLanguage({_:function(){return i.optWhitespace},letters:function(){return i.regexp(/[a-zA-Z0-9$_]+/).skip(a).desc("letters")},lettersArray:function(t){return t.lbracket.then(t.letters.sepBy(t.comma)).skip(t.rbracket).desc("letters array")},arg:function(t){return t.letters.or(t.lettersArray).desc("arg")},lbracket:function(){return e("[")},rbracket:function(){return e("]")},lparen:function(){return e("(")},get:function(){return e("get")},rparen:function(){return e(")")},lbrace:function(){return e("{")},rbrace:function(){return e("}")},comma:function(){return e(",")},dot:function(){return e(".")},semi:function(){return e(";")},arrow:function(){return e("=>")},param:function(t){return i.regexp(/"((?:\\.|.)*?)"/,1).map(function(t){return{type:"string",value:o(t)}}).or(i.regexp(/'((?:\\.|.)*?)'/,1).map(function(t){return{type:"string",value:o(t)}})).or(i.regexp(/\d+/).map(function(t){return{type:"number",value:Number(t)}})).or(t.letters.map(function(t){return{type:"variable",value:t}}))},field:function(t){return t._.then(t.dot.then(t.get).then(t.lparen).then(t.param).skip(t.rparen)).or(t.dot.then(t.letters.map(function(t){return{type:"string",value:t}}))).or(t.lbracket.then(t.param).skip(t.rbracket))},fnKeyword:function(){return e("function")},return:function(){return e("return")},function:function(t){return i.seqObj(t.fnKeyword,t.lparen,["args",t.arg.sepBy(t.comma).desc("args")],t.rparen,t.lbrace,t.return,["obj",t.letters],["keyPath",t.field.sepBy(t._)],t.semi.or(t._),t.rbrace,i.eof)},lambda:function(t){return i.seqObj(t.lparen.or(t._),["args",t.arg.sepBy(t.comma).desc("args")],t.rparen.or(t._),t.arrow,t.lbrace.or(t._),t.return.or(t._),["obj",t.letters],["keyPath",t.field.sepBy(t._)],t.semi.or(t._),t.rbrace.or(t._),i.eof)},accessor:function(t){return t.function.or(t.lambda)}})},function(t,n,r){!function(n,r){t.exports=r()}(0,function(){return function(t){function n(e){if(r[e])return r[e].exports;var u=r[e]={i:e,l:!1,exports:{}};return t[e].call(u.exports,u,u.exports,n),u.l=!0,u.exports}var r={};return n.m=t,n.c=r,n.i=function(t){return t},n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=0)}([function(t,n,r){"use strict";function e(t){if(!(this instanceof e))return new e(t);this._=t}function u(t){return t instanceof e}function o(t){return"[object Array]"==={}.toString.call(t)}function i(t,n){return{status:!0,index:t,value:n,furthest:-1,expected:[]}}function a(t,n){return{status:!1,index:-1,value:null,furthest:t,expected:[n]}}function c(t,n){if(!n)return t;if(t.furthest>n.furthest)return t;var r=t.furthest===n.furthest?f(t.expected,n.expected):n.expected;return{status:t.status,index:t.index,value:t.value,furthest:n.furthest,expected:r}}function s(t,n){var r=t.slice(0,n).split("\n");return{offset:n,line:r.length,column:r[r.length-1].length+1}}function f(t,n){var r=t.length,e=n.length;if(0===r)return n;if(0===e)return t;for(var u={},o=0;o<r;o++)u[t[o]]=!0;for(var i=0;i<e;i++)u[n[i]]=!0;var a=[];for(var c in u)u.hasOwnProperty(c)&&a.push(c);return a.sort(),a}function l(t){if(!u(t))throw new Error("not a parser: "+t)}function p(t){if(!o(t))throw new Error("not an array: "+t)}function h(t){if("number"!=typeof t)throw new Error("not a number: "+t)}function d(t){if(!(t instanceof RegExp))throw new Error("not a regexp: "+t);for(var n=b(t),r=0;r<n.length;r++){var e=n.charAt(r);if("i"!==e&&"m"!==e&&"u"!==e)throw new Error('unsupported regexp flag "'+e+'": '+t)}}function v(t){if("function"!=typeof t)throw new Error("not a function: "+t)}function y(t){if("string"!=typeof t)throw new Error("not a string: "+t)}function g(t){return 1===t.length?t[0]:"one of "+t.join(", ")}function m(t,n){var r=n.index,e=r.offset;if(e===t.length)return", got the end of the input";var u=e>0?"'...":"'",o=t.length-e>12?"...'":"'";return" at line "+r.line+" column "+r.column+", got "+u+t.slice(e,e+12)+o}function x(t,n){return"expected "+g(n.expected)+m(t,n)}function b(t){var n=""+t;return n.slice(n.lastIndexOf("/")+1)}function w(t){return RegExp("^(?:"+t.source+")",b(t))}function _(){for(var t=[].slice.call(arguments),n=t.length,r=0;r<n;r+=1)l(t[r]);return e(function(r,e){for(var u,o=new Array(n),a=0;a<n;a+=1){if(u=c(t[a]._(r,e),u),!u.status)return u;o[a]=u.value,e=u.index}return c(i(e,o),u)})}function O(){for(var t={},n=0,r=[].slice.call(arguments),a=r.length,s=0;s<a;s+=1){var f=r[s];if(!u(f)){if(o(f)&&2===f.length&&"string"==typeof f[0]&&u(f[1])){var l=f[0];if(t[l])throw new Error("seqObj: duplicate key "+l);t[l]=!0,n++;continue}throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.")}}if(0===n)throw new Error("seqObj expects at least one named parser, found zero");return e(function(t,n){for(var e,u={},s=0;s<a;s+=1){var f,l;if(o(r[s])?(f=r[s][0],l=r[s][1]):(f=null,l=r[s]),e=c(l._(t,n),e),!e.status)return e;f&&(u[f]=e.value),n=e.index}return c(i(n,u),e)})}function j(){var t=[].slice.call(arguments);if(0===t.length)throw new Error("seqMap needs at least one argument");var n=t.pop();return v(n),_.apply(null,t).map(function(t){return n.apply(null,t)})}function k(t){var n={};for(var r in t)({}).hasOwnProperty.call(t,r)&&function(r){var e=function(){return t[r](n)};n[r]=N(e)}(r);return n}function P(){var t=[].slice.call(arguments),n=t.length;if(0===n)return B("zero alternates");for(var r=0;r<n;r+=1)l(t[r]);return e(function(n,r){for(var e,u=0;u<t.length;u+=1)if(e=c(t[u]._(n,r),e),e.status)return e;return e})}function E(t,n){return z(t,n).or(A([]))}function z(t,n){return l(t),l(n),j(t,n.then(t).many(),function(t,n){return[t].concat(n)})}function I(t){y(t);var n="'"+t+"'";return e(function(r,e){var u=e+t.length,o=r.slice(e,u);return o===t?i(u,o):a(e,n)})}function S(t,n){d(t),arguments.length>=2?h(n):n=0;var r=w(t),u=""+t;return e(function(t,e){var o=r.exec(t.slice(e));if(o){if(0<=n&&n<=o.length){var c=o[0],s=o[n];return i(e+c.length,s)}return a(e,"valid match group (0 to "+o.length+") in "+u)}return a(e,u)})}function A(t){return e(function(n,r){return i(r,t)})}function B(t){return e(function(n,r){return a(r,t)})}function F(t){if(u(t))return e(function(n,r){var e=t._(n,r);return e.index=r,e.value="",e});if("string"==typeof t)return F(I(t));if(t instanceof RegExp)return F(S(t));throw new Error("not a string, regexp, or parser: "+t)}function C(t){return l(t),e(function(n,r){var e=t._(n,r),u=n.slice(r,e.index);return e.status?a(r,'not "'+u+'"'):i(r,null)})}function q(t){return v(t),e(function(n,r){var e=n.charAt(r);return r<n.length&&t(e)?i(r+1,e):a(r,"a character matching "+t)})}function M(t){return q(function(n){return t.indexOf(n)>=0})}function K(t){return q(function(n){return t.indexOf(n)<0})}function L(t){return e(t(i,a))}function R(t,n){return q(function(r){return t<=r&&r<=n}).desc(t+"-"+n)}function W(t){return v(t),e(function(n,r){for(var e=r;e<n.length&&t(n.charAt(e));)e++;return i(e,n.slice(r,e))})}function N(t,n){arguments.length<2&&(n=t,t=void 0);var r=e(function(t,e){return r._=n()._,r._(t,e)});return t?r.desc(t):r}function T(){return B("fantasy-land/empty")}var Z=e.prototype;Z.parse=function(t){if("string"!=typeof t)throw new Error(".parse must be called with a string as its argument");var n=this.skip(H)._(t,0);return n.status?{status:!0,value:n.value}:{status:!1,index:s(t,n.furthest),expected:n.expected}},Z.tryParse=function(t){var n=this.parse(t);if(n.status)return n.value;var r=x(t,n),e=new Error(r);throw e.type="ParsimmonError",e.result=n,e},Z.or=function(t){return P(this,t)},Z.trim=function(t){return this.wrap(t,t)},Z.wrap=function(t,n){return j(t,this,n,function(t,n){return n})},Z.thru=function(t){return t(this)},Z.then=function(t){return l(t),_(this,t).map(function(t){return t[1]})},Z.many=function(){var t=this;return e(function(n,r){for(var e=[],u=void 0;;){if(u=c(t._(n,r),u),!u.status)return c(i(r,e),u);if(r===u.index)throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");r=u.index,e.push(u.value)}})},Z.tie=function(){return this.map(function(t){p(t);for(var n="",r=0;r<t.length;r++)y(t[r]),n+=t[r];return n})},Z.times=function(t,n){var r=this;return arguments.length<2&&(n=t),h(t),h(n),e(function(e,u){for(var o=[],a=void 0,s=void 0,f=0;f<t;f+=1){if(a=r._(e,u),s=c(a,s),!a.status)return s;u=a.index,o.push(a.value)}for(;f<n&&(a=r._(e,u),s=c(a,s),a.status);f+=1)u=a.index,o.push(a.value);return c(i(u,o),s)})},Z.result=function(t){return this.map(function(){return t})},Z.atMost=function(t){return this.times(0,t)},Z.atLeast=function(t){return j(this.times(t),this.many(),function(t,n){return t.concat(n)})},Z.map=function(t){v(t);var n=this;return e(function(r,e){var u=n._(r,e);return u.status?c(i(u.index,t(u.value)),u):u})},Z.skip=function(t){return _(this,t).map(function(t){return t[0]})},Z.mark=function(){return j($,this,$,function(t,n,r){return{start:t,value:n,end:r}})},Z.node=function(t){return j($,this,$,function(n,r,e){return{name:t,value:r,start:n,end:e}})},Z.sepBy=function(t){return E(this,t)},Z.sepBy1=function(t){return z(this,t)},Z.lookahead=function(t){return this.skip(F(t))},Z.notFollowedBy=function(t){return this.skip(C(t))},Z.desc=function(t){var n=this;return e(function(r,e){var u=n._(r,e);return u.status||(u.expected=[t]),u})},Z.fallback=function(t){return this.or(A(t))},Z.ap=function(t){return j(t,this,function(t,n){return t(n)})},Z.chain=function(t){var n=this;return e(function(r,e){var u=n._(r,e);return u.status?c(t(u.value)._(r,u.index),u):u})},Z.concat=Z.or,Z.empty=T,Z.of=A,Z["fantasy-land/ap"]=Z.ap,Z["fantasy-land/chain"]=Z.chain,Z["fantasy-land/concat"]=Z.concat,Z["fantasy-land/empty"]=Z.empty,Z["fantasy-land/of"]=Z.of,Z["fantasy-land/map"]=Z.map;var $=e(function(t,n){return i(n,s(t,n))}),D=e(function(t,n){return n>=t.length?a(n,"any character"):i(n+1,t.charAt(n))}),G=e(function(t,n){return i(t.length,t.slice(n))}),H=e(function(t,n){return n<t.length?a(n,"EOF"):i(n,null)}),J=S(/[0-9]/).desc("a digit"),Q=S(/[0-9]*/).desc("optional digits"),U=S(/[a-z]/i).desc("a letter"),V=S(/[a-z]*/i).desc("optional letters"),X=S(/\s*/).desc("optional whitespace"),Y=S(/\s+/).desc("whitespace");e.all=G,e.alt=P,e.any=D,e.createLanguage=k,e.custom=L,e.digit=J,e.digits=Q,e.empty=T,e.eof=H,e.fail=B,e.formatError=x,e.index=$,e.isParser=u,e.lazy=N,e.letter=U,e.letters=V,e.lookahead=F,e.makeFailure=a,e.makeSuccess=i,e.noneOf=K,e.notFollowedBy=C,e.of=A,e.oneOf=M,e.optWhitespace=X,e.Parser=e,e.range=R,e.regex=S,e.regexp=S,e.sepBy=E,e.sepBy1=z,e.seq=_,e.seqMap=j,e.seqObj=O,e.string=I,e.succeed=A,e.takeWhile=W,e.test=q,e.whitespace=Y,e["fantasy-land/empty"]=T,e["fantasy-land/of"]=A,t.exports=e}])})}])});
//# sourceMappingURL=hydux.mutator.js.map