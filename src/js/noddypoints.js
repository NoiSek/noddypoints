!function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var r=n(1),s=a(r),i=n(3),o=a(i),l=n(5),u=a(l),c=n(8),d=a(c),p=new o.default,f=new d.default(1200),h=new u.default,m=new s.default;setTimeout(function(){h.start().then(function(e){f.start().then(function(e){p.playGrowAnimation()})})},2e3),p.loop(),m.loop()},function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(2),o=a(i),l=function(){function e(){r(this,e),this.height=3,this.width=3,this.state={initialized:!1}}return s(e,[{key:"die",value:function(){this.state.initialized=!1,this.initialize()}},{key:"initialize",value:function(){if(this.state.initialized===!1){var e=new Date,t=new Date;t.setMilliseconds(t.getMilliseconds()+o.randomRange(3e3,5e3)),this.state.position={x:o.randomRange(0,.8*window.canvasWidth),y:o.randomRange(0,window.canvasHeight)},this.state.birth=e,this.state.expiration=t,this.state.velocity={x:o.randomRange(1,3),y:o.randomRange(0,2)},this.state.initialized=!0}}},{key:"step",value:function(e){this.initialize();var t=this.state.expiration-window.currentTime;t<=0&&this.die(),this.state.position.x=this.state.position.x+this.state.velocity.x,this.state.position.y=this.state.position.y+this.state.velocity.y,e.fillStyle=window.testColor,e.fillRect(this.state.position.x,this.state.position.y,this.height,this.width)}}]),e}(),u=function(){function e(){var t=this;r(this,e),this.fps=120,window.testColor="rgb(135, 83, 187)";var n={};n.canvasBackground=document.getElementsByClassName("canvas-background")[0],n.canvasStars=document.getElementsByClassName("canvas-stars")[0],window.canvasHeight=n.canvasStars.height,window.canvasWidth=n.canvasStars.width,this.drawInitialBackground(n.canvasBackground),setInterval(function(){t.drawInitialBackground(n.canvasBackground)},1e4);for(var a=n.canvasStars.getContext("2d"),s=[],i=0;i<50;i++)s.push(new l);this.state={context:a,elements:n,stars:s}}return s(e,[{key:"drawInitialBackground",value:function(e){var t=e.getContext("2d");t.clearRect(0,0,e.width,e.height);for(var n=e.height/2,a=e.width,r=.8*e.height,s=o.randomRange(n-.1*e.height,n-.1*e.height),i=Math.floor(r),l={x:0,y:s},u=!0,c=function(){var n=void 0,a=void 0,r=i-o.randomRange(.1*i,.4*i);r=Math.max(r,2),a=l.y+o.randomRange(-(.1*i),.1*i),u===!0&&(r=i,a=l.y);var s=o.randomRange(5,15),c=Math.floor(e.width/s);n=l.x+c,t.beginPath(),t.moveTo(l.x,a),t.lineTo(n,a);var d=["0.2","0.4","0.6","0.8","1"];d.reverse().map(function(e,n){t.lineWidth=r+25*n,t.strokeStyle="rgba(51, 28, 74, "+e+")",t.stroke()}),l.x=n,l.y=a,i=r,u=!1};l.x<a;)c()}},{key:"loop",value:function(){var e=this,t=this.state.context;t.globalCompositeOperation="destination-out",t.fillStyle="rgba(0, 0, 0, 0.3)",t.fillRect(0,0,window.innerWidth,window.innerHeight),t.globalCompositeOperation="source-over";var n=!0,a=!1,r=void 0;try{for(var s,i=this.state.stars[Symbol.iterator]();!(n=(s=i.next()).done);n=!0){var o=s.value;o.step(t)}}catch(e){a=!0,r=e}finally{try{!n&&i.return&&i.return()}finally{if(a)throw r}}setTimeout(function(){window.requestAnimationFrame(e.loop.bind(e))},1e3/this.fps)}}]),e}();t.default=u},function(e,t){"use strict";function n(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=Math.random()*(t-e+1)+e;return a=0===n?Math.floor(a):Math.floor(a*(10*n))/n}function a(e){for(var t,n=(""+(e<0?-e:e)).split("."),a=n[0],r=t=a.length,s="";r--;)s=(0===r?"":(t-r)%3?"":",")+a.charAt(r)+s;return(e<0?"-":"")+s+(n[1]?"."+n[1]:"")}Object.defineProperty(t,"__esModule",{value:!0}),t.randomRange=n,t.commafy=a},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"particle",a=[],r=0;r<t;r++){var s=document.createElement("div");s.className=n+" "+n+"-"+r+" hidden",e.appendChild(s),a[r]=new l.default(s,r,n)}return a}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(4),l=a(o),u=function(){function e(){r(this,e),this.fps=60;var t={};t.bar=document.getElementsByClassName("bar")[0],t.fill=document.getElementsByClassName("fill")[0],t.particleContainer=document.getElementsByClassName("particle-container")[0],t.particleXContainer=document.getElementsByClassName("particle-x-container")[0];var n=s(t.particleContainer,10),a=s(t.particleXContainer,50,"particle-x");this.state={elements:t,particles:n,xParticles:a,triggerFinalAnimation:!1}}return i(e,[{key:"loop",value:function(){var e=this;window.currentTime=new Date,window.xContainerWidth=this.state.elements.particleXContainer.offsetWidth;var t=!0,n=!1,a=void 0;try{for(var r,s=this.state.particles[Symbol.iterator]();!(t=(r=s.next()).done);t=!0){var i=r.value;i.step()}}catch(e){n=!0,a=e}finally{try{!t&&s.return&&s.return()}finally{if(n)throw a}}if(this.state.triggerFinalAnimation===!0){this.state.xParticles=this.state.xParticles.filter(function(e){return e.state.dead===!1});var o=!0,l=!1,u=void 0;try{for(var c,d=this.state.xParticles[Symbol.iterator]();!(o=(c=d.next()).done);o=!0){var p=c.value;p.step()}}catch(e){l=!0,u=e}finally{try{!o&&d.return&&d.return()}finally{if(l)throw u}}}setTimeout(function(){window.requestAnimationFrame(e.loop.bind(e))},1e3/this.fps)}},{key:"playGrowAnimation",value:function(){var e=this;this.state.elements.fill.className=this.state.elements.fill.className+" animate",setTimeout(function(){e.state.triggerFinalAnimation=!0},2e3)}}]),e}();t.default=u},function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(2),o=a(i),l=function(){function e(t,n,a){r(this,e),this.state={el:t,number:n,type:a,dead:!1,initialized:!1}}return s(e,[{key:"die",value:function(){this.state.el.style=""}},{key:"initialize",value:function(){if(this.state.initialized===!1){var e=new Date,t=new Date;t.setMilliseconds(t.getMilliseconds()+o.randomRange(200,3e3)),this.state.birth=e,this.state.expiration=t,"particle-x"===this.state.type?this.state.curve=[{x:o.randomRange(-window.xContainerWidth-100,100),y:o.randomRange(-150,150)},{x:o.randomRange(-window.xContainerWidth-100,100),y:o.randomRange(-150,150)},{x:o.randomRange(-window.xContainerWidth,0),y:o.randomRange(-50,50)}]:this.state.curve=[{x:o.randomRange(50,200),y:o.randomRange(-100,250)},{x:o.randomRange(-30,400),y:o.randomRange(-25,75)},{x:o.randomRange(0,5),y:o.randomRange(0,40)}],this.state.el.className=this.state.el.className.replace(" hidden",""),this.state.initialized=!0}}},{key:"step",value:function(){this.initialize();var e=this.state.expiration-this.state.birth,t=this.state.expiration-window.currentTime;if(t<=0)return"particle-x"===this.state.type&&(this.state.el.parentElement.removeChild(this.state.el),this.state.dead=!0),this.state.el.className=this.state.el.className+" hidden",this.state.initialized=!1,void this.die();var n=Math.floor(t/e*100)/100,a=this.state.curve,r=(1-n)*(1-n)*a[0].x+2*(1-n)*n*a[1].x+n*n*a[2].x,s=(1-n)*(1-n)*a[0].y+2*(1-n)*n*a[1].y+n*n*a[2].y;this.state.el.style.opacity=String(n),this.state.el.style.transform="translateX("+r+"px) translateY("+s+"px"}}]),e}();t.default=l},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(6),o=a(i),l=function(){function e(t){var n=this;r(this,e);var a={};a.todo=document.getElementsByClassName("todo")[0],a.tasks=[],this.state={elements:a,loaded:!1,finished:!1},this.promise=(0,o.default)({url:"src/js/data.json",method:"get",success:function(e){var t=void 0;t=void 0!==e.status?JSON.parse(e.response):e,n.state.tasks=t.testguy.tasks,n.state.loaded=!0}})}return s(e,[{key:"populateTodo",value:function(){var e=this;this.promise.then(function(t){e.state.tasks.map(function(t,n){var a=document.createElement("li");a.className="task-"+n;var r=document.createElement("div"),s=document.createElement("div"),i=document.createElement("div"),o=t.name;o.length>20&&(o=o.slice(0,17)+"..."),r.className="task-name-upper",s.className="task-name-lower",i.className="task-name-shadow",r.innerText=o,s.innerText=o,i.innerText=o,a.appendChild(r),a.appendChild(s),a.appendChild(i),e.state.elements.todo.appendChild(a),e.state.elements.tasks.push(a)})})}},{key:"start",value:function(){var e=this;this.populateTodo();var t=new Promise(function(t,n){var a=200;e.state.elements.tasks.map(function(e,n,r){var s=0===n?0:n*a+200*n;setTimeout(function(){e.className=e.className+" drop-in",n===r.length-1&&setTimeout(function(){t(!0)},s)},s)})});t.then(function(t){var n=200;e.state.tasks.map(function(t,a,r){var s=0===a?0:a*n+200*a;t.complete===!0&&setTimeout(function(){var t=e.state.elements.tasks[a];t.className=t.className+" completed"},s),a===r.length-1&&setTimeout(function(){e.state.finished=!0},s)})});var n=new Promise(function(t,n){var a=function n(){var a=e.state.finished===!0;a?t(e.state.currentValue):setTimeout(n,200)};a()});return n}}]),e}();t.default=l},function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};/*!
	  * Reqwest! A general purpose XHR connection manager
	  * license MIT (c) Dustin Diaz 2015
	  * https://github.com/ded/reqwest
	  */
!function(e,t,n){"undefined"!=typeof module&&module.exports?module.exports=n():(__WEBPACK_AMD_DEFINE_FACTORY__=n,__WEBPACK_AMD_DEFINE_RESULT__="function"==typeof __WEBPACK_AMD_DEFINE_FACTORY__?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,!(void 0!==__WEBPACK_AMD_DEFINE_RESULT__&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))}("reqwest",void 0,function(){function succeed(e){var t=protocolRe.exec(e.url);return t=t&&t[1]||context.location.protocol,httpsRe.test(t)?twoHundo.test(e.request.status):!!e.request.response}function handleReadyState(e,t,n){return function(){return e._aborted?n(e.request):e._timedOut?n(e.request,"Request is aborted: timeout"):void(e.request&&4==e.request[readyState]&&(e.request.onreadystatechange=noop,succeed(e)?t(e.request):n(e.request)))}}function setHeaders(e,t){var n,a=t.headers||{};a.Accept=a.Accept||defaultHeaders.accept[t.type]||defaultHeaders.accept["*"];var r="undefined"!=typeof FormData&&t.data instanceof FormData;t.crossOrigin||a[requestedWith]||(a[requestedWith]=defaultHeaders.requestedWith),a[contentType]||r||(a[contentType]=t.contentType||defaultHeaders.contentType);for(n in a)a.hasOwnProperty(n)&&"setRequestHeader"in e&&e.setRequestHeader(n,a[n])}function setCredentials(e,t){"undefined"!=typeof t.withCredentials&&"undefined"!=typeof e.withCredentials&&(e.withCredentials=!!t.withCredentials)}function generalCallback(e){lastValue=e}function urlappend(e,t){return e+(/\?/.test(e)?"&":"?")+t}function handleJsonp(e,t,n,a){var r=uniqid++,s=e.jsonpCallback||"callback",i=e.jsonpCallbackName||reqwest.getcallbackPrefix(r),o=new RegExp("((^|\\?|&)"+s+")=([^&]+)"),l=a.match(o),u=doc.createElement("script"),c=0,d=navigator.userAgent.indexOf("MSIE 10.0")!==-1;return l?"?"===l[3]?a=a.replace(o,"$1="+i):i=l[3]:a=urlappend(a,s+"="+i),context[i]=generalCallback,u.type="text/javascript",u.src=a,u.async=!0,"undefined"==typeof u.onreadystatechange||d||(u.htmlFor=u.id="_reqwest_"+r),u.onload=u.onreadystatechange=function(){return!(u[readyState]&&"complete"!==u[readyState]&&"loaded"!==u[readyState]||c)&&(u.onload=u.onreadystatechange=null,u.onclick&&u.onclick(),t(lastValue),lastValue=void 0,head.removeChild(u),void(c=1))},head.appendChild(u),{abort:function(){u.onload=u.onreadystatechange=null,n({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(u),c=1}}}function getRequest(e,t){var n,a=this.o,r=(a.method||"GET").toUpperCase(),s="string"==typeof a?a:a.url,i=a.processData!==!1&&a.data&&"string"!=typeof a.data?reqwest.toQueryString(a.data):a.data||null,o=!1;return"jsonp"!=a.type&&"GET"!=r||!i||(s=urlappend(s,i),i=null),"jsonp"==a.type?handleJsonp(a,e,t,s):(n=a.xhr&&a.xhr(a)||xhr(a),n.open(r,s,a.async!==!1),setHeaders(n,a),setCredentials(n,a),context[xDomainRequest]&&n instanceof context[xDomainRequest]?(n.onload=e,n.onerror=t,n.onprogress=function(){},o=!0):n.onreadystatechange=handleReadyState(this,e,t),a.before&&a.before(n),o?setTimeout(function(){n.send(i)},200):n.send(i),n)}function Reqwest(e,t){this.o=e,this.fn=t,init.apply(this,arguments)}function setType(e){if(null!==e)return e.match("json")?"json":e.match("javascript")?"js":e.match("text")?"html":e.match("xml")?"xml":void 0}function init(o,fn){function complete(e){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;)self._completeHandlers.shift()(e)}function success(resp){var type=o.type||resp&&setType(resp.getResponseHeader("Content-Type"));resp="jsonp"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r}catch(e){}if(r)switch(type){case"json":try{resp=context.JSON?context.JSON.parse(r):eval("("+r+")")}catch(e){return error(resp,"Could not parse JSON in response",e)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);self._fulfillmentHandlers.length>0;)resp=self._fulfillmentHandlers.shift()(resp);complete(resp)}function timedOut(){self._timedOut=!0,self.request.abort()}function error(e,t,n){for(e=self.request,self._responseArgs.resp=e,self._responseArgs.msg=t,self._responseArgs.t=n,self._erred=!0;self._errorHandlers.length>0;)self._errorHandlers.shift()(e,t,n);complete(e)}this.url="string"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){timedOut()},o.timeout)),o.success&&(this._successHandler=function(){o.success.apply(o,arguments)}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments)}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments)}),this.request=getRequest.call(this,success,error)}function reqwest(e,t){return new Reqwest(e,t)}function normalize(e){return e?e.replace(/\r?\n/g,"\r\n"):""}function serial(e,t){var n,a,r,s,i=e.name,o=e.tagName.toLowerCase(),l=function(e){e&&!e.disabled&&t(i,normalize(e.attributes.value&&e.attributes.value.specified?e.value:e.text))};if(!e.disabled&&i)switch(o){case"input":/reset|button|image|file/i.test(e.type)||(n=/checkbox/i.test(e.type),a=/radio/i.test(e.type),r=e.value,(!(n||a)||e.checked)&&t(i,normalize(n&&""===r?"on":r)));break;case"textarea":t(i,normalize(e.value));break;case"select":if("select-one"===e.type.toLowerCase())l(e.selectedIndex>=0?e.options[e.selectedIndex]:null);else for(s=0;e.length&&s<e.length;s++)e.options[s].selected&&l(e.options[s])}}function eachFormElement(){var e,t,n=this,a=function(e,t){var a,r,s;for(a=0;a<t.length;a++)for(s=e[byTag](t[a]),r=0;r<s.length;r++)serial(s[r],n)};for(t=0;t<arguments.length;t++)e=arguments[t],/input|select|textarea/i.test(e.tagName)&&serial(e,n),a(e,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var e={};return eachFormElement.apply(function(t,n){t in e?(e[t]&&!isArray(e[t])&&(e[t]=[e[t]]),e[t].push(n)):e[t]=n},arguments),e}function buildParams(e,t,n,a){var r,s,i,o=/\[\]$/;if(isArray(t))for(s=0;t&&s<t.length;s++)i=t[s],n||o.test(e)?a(e,i):buildParams(e+"["+("object"===("undefined"==typeof i?"undefined":_typeof(i))?s:"")+"]",i,n,a);else if(t&&"[object Object]"===t.toString())for(r in t)buildParams(e+"["+r+"]",t[r],n,a);else a(e,t)}var context=this;if("window"in context)var doc=document,byTag="getElementsByTagName",head=doc[byTag]("head")[0];else{var XHR2;try{XHR2=__webpack_require__(7)}catch(e){throw new Error("Peer dependency `xhr2` required! Please npm install xhr2")}}var httpsRe=/^http/,protocolRe=/(^\w+):\/\//,twoHundo=/^(20\d|1223)$/,readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",xDomainRequest="XDomainRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(e){return e instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=function e(t){if(t.crossOrigin===!0){var e=context[xmlHttpRequest]?new XMLHttpRequest:null;if(e&&"withCredentials"in e)return e;if(context[xDomainRequest])return new XDomainRequest;throw new Error("Browser does not support cross-origin requests")}return context[xmlHttpRequest]?new XMLHttpRequest:XHR2?new XHR2:new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(e){return e}};return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(e,t){return e=e||function(){},t=t||function(){},this._fulfilled?this._responseArgs.resp=e(this._responseArgs.resp):this._erred?t(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(e),this._errorHandlers.push(t)),this},always:function(e){return this._fulfilled||this._erred?e(this._responseArgs.resp):this._completeHandlers.push(e),this},fail:function(e){return this._erred?e(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(e),this},catch:function(e){return this.fail(e)}},reqwest.serializeArray=function(){var e=[];return eachFormElement.apply(function(t,n){e.push({name:t,value:n})},arguments),e},reqwest.serialize=function(){if(0===arguments.length)return"";var e,t,n=Array.prototype.slice.call(arguments,0);return e=n.pop(),e&&e.nodeType&&n.push(e)&&(e=null),e&&(e=e.type),t="map"==e?serializeHash:"array"==e?reqwest.serializeArray:serializeQueryString,t.apply(null,n)},reqwest.toQueryString=function(e,t){var n,a,r=t||!1,s=[],i=encodeURIComponent,o=function(e,t){t="function"==typeof t?t():null==t?"":t,s[s.length]=i(e)+"="+i(t)};if(isArray(e))for(a=0;e&&a<e.length;a++)o(e[a].name,e[a].value);else for(n in e)e.hasOwnProperty(n)&&buildParams(n,e[n],r,o);return s.join("&").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix},reqwest.compat=function(e,t){return e&&(e.type&&(e.method=e.type)&&delete e.type,e.dataType&&(e.type=e.dataType),e.jsonpCallback&&(e.jsonpCallbackName=e.jsonpCallback)&&delete e.jsonpCallback,e.jsonp&&(e.jsonpCallback=e.jsonp)),new Reqwest(e,t)},reqwest.ajaxSetup=function(e){e=e||{};for(var t in e)globalSetupOptions[t]=e[t]},reqwest})},function(e,t){},function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(2),o=a(i),l=function(){function e(t){r(this,e);var n={};n.counter=document.getElementsByClassName("counter")[0],n.counterValue=document.getElementsByClassName("points")[0],n.counterDescription=document.getElementsByClassName("description")[0],n.counterModifier=document.getElementsByClassName("modifier")[0],this.state={currentValue:0,elements:n,finished:!1,goalValue:t,incrementCounter:0,speed:200}}return s(e,[{key:"rapidifySpeedMostFastlyBuckaroo",value:function(){var e=this;this.state.finished===!1&&this.state.speed>2&&setTimeout(function(){e.state.speed=Math.max(2,e.state.speed/2),e.rapidifySpeedMostFastlyBuckaroo()},500)}},{key:"start",value:function(){var e=this;this.loop(),this.rapidifySpeedMostFastlyBuckaroo();var t=new Promise(function(t,n){var a=function n(){var a=e.state.finished===!0;a?t(e.state.currentValue):setTimeout(n,200)};a()});return t}},{key:"loop",value:function(){var e=this;this.state.currentValue=this.state.currentValue+1,this.state.incrementCounter=this.state.incrementCounter+1,100===this.state.incrementCounter&&(this.state.incrementCounter=0,this.playIncrementalAnimation()),this.state.currentValue===this.state.goalValue&&(this.state.finished=!0,this.playFinalAnimation()),this.state.elements.counterValue.innerText=o.commafy(this.state.currentValue),this.state.finished===!1&&setTimeout(function(){e.loop()},this.state.speed)}},{key:"playFinalAnimation",value:function(){this.state.elements.counter.className=this.state.elements.counter.className.replace(" increment",""),this.state.elements.counter.className+=" finished"}},{key:"playIncrementalAnimation",value:function(){var e=this;this.state.elements.counter.className=this.state.elements.counter.className.replace(" increment",""),setTimeout(function(){e.state.finished===!1&&(e.state.elements.counter.className+=" increment")},15)}}]),e}();t.default=l}]);