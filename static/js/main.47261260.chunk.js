(this.webpackJsonpplayground=this.webpackJsonpplayground||[]).push([[0],{16:function(e,n,t){},19:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o),c=t(10),i=t.n(c),a=(t(16),t(2)),s=t.p+"static/media/logo.6ce24c58.svg",l=t(4),d=(t(8),t(1));function u(){}var j=Object(o.createContext)({onLoad:u,init:u,captureMessage:u,captureException:u,configureScope:u,Severity:{},withScope:u,Integrations:{}});function p(e){var n=e.children,t=e.url,r=e.config,c=e.integrity,i=e.performance,a=void 0!==i&&i,s=e.tracingOptions,l={onLoad:function(e){var n;return null===(n=null===window||void 0===window?void 0:window.Sentry)||void 0===n?void 0:n.onLoad(e)},init:function(e){var n;return null===(n=null===window||void 0===window?void 0:window.Sentry)||void 0===n?void 0:n.init(e)},captureMessage:function(e,n){var t;return null===(t=null===window||void 0===window?void 0:window.Sentry)||void 0===t?void 0:t.captureMessage(e,null!==n&&void 0!==n?n:"warning")},captureException:function(e,n){var t;return null===(t=null===window||void 0===window?void 0:window.Sentry)||void 0===t?void 0:t.captureException(e,null!==n&&void 0!==n?n:"warning")},configureScope:function(e){var n;return null===(n=null===window||void 0===window?void 0:window.Sentry)||void 0===n?void 0:n.configureScope(e)},withScope:function(e){var n;return null===(n=null===window||void 0===window?void 0:window.Sentry)||void 0===n?void 0:n.withScope(e)},Severity:{Critical:"critical",Debug:"debug",Error:"error",Fatal:"fatal",Info:"info",Log:"log",Warning:"warning"},Integrations:{}};return Object(o.useLayoutEffect)((function(){var e=document.createElement("script");e.src=t,e.crossOrigin="anonymous",e.type="application/javascript";var n=document.getElementsByTagName("head")[0],o=!1;function i(){if(!o&&(!this.readyState||"loaded"===this.readyState||"complete"===this.readyState)){if(a){var e=new window.Sentry.Integrations.BrowserTracing.prototype.constructor(s);r.integrations=[e]}o=!0,l.onLoad((function(){return l.init(r)}))}}e.onload=i,e.onreadystatechange=i,c&&(e.integrity=c),n.appendChild(e)}),[]),Object(d.jsx)(j.Provider,Object.assign({value:l},{children:n}),void 0)}function h(){return Object(o.useContext)(j)}var g=function(){var e=h();Object(o.useEffect)((function(){e.captureMessage("page 404")}),[e]);var n="localhost"!==window.location.hostname?"/sentry-react-lazy":"";return Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("header",{className:"App-header",children:[Object(d.jsx)(l.b,{to:"".concat(n,"/"),children:"Home"}),Object(d.jsx)("h1",{children:"404"}),Object(d.jsx)("img",{src:s,className:"App-logo",alt:"logo"}),"Sentry error sent on page load"]})})},v=t(9),b=t.n(v),w=t(11);function f(){var e=function(){var e=Object(w.a)(b.a.mark((function e(){var n,t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api64.ipify.org?format=json");case 2:return n=e.sent,e.next=5,n.json();case 5:t=e.sent,console.log(t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsx)("button",{onClick:e,children:"Call API test"})}var m=function(){var e=h(),n="localhost"!==window.location.hostname?"/sentry-react-lazy":"";return Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("header",{className:"App-header",children:[Object(d.jsx)(l.b,{to:"".concat(n,"/"),children:"Home"}),Object(d.jsx)("h1",{children:"About Page"}),Object(d.jsx)("img",{src:s,className:"App-logo",alt:"logo"}),Object(d.jsx)("button",{onClick:function(){return e.captureMessage("hello from button")},children:"Sentry call"}),Object(d.jsx)(f,{})]})})},O=function(){var e=h(),n="localhost"!==window.location.hostname?"/sentry-react-lazy":"";return Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("header",{className:"App-header",children:[Object(d.jsx)(l.b,{to:"".concat(n,"/about"),children:"About"}),Object(d.jsx)("h1",{children:"Home Page"}),Object(d.jsx)("img",{src:s,className:"App-logo",alt:"logo"}),Object(d.jsx)("button",{onClick:function(){return e.captureMessage("hello from button")},children:"Sentry call"}),Object(d.jsx)(f,{})]})})},x=function(){var e="localhost"!==window.location.hostname?"/sentry-react-lazy":"";return Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)(a.c,{children:[Object(d.jsx)(a.a,{path:"".concat(e,"/"),element:Object(d.jsx)(O,{})}),Object(d.jsx)(a.a,{path:"".concat(e,"/about"),element:Object(d.jsx)(m,{})}),Object(d.jsx)(a.a,{path:"".concat(e,"/*"),element:Object(d.jsx)(g,{})})]})})},y=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,20)).then((function(n){var t=n.getCLS,o=n.getFID,r=n.getFCP,c=n.getLCP,i=n.getTTFB;t(e),o(e),r(e),c(e),i(e)}))};i.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(p,{url:"https://browser.sentry-cdn.com/6.16.0/bundle.tracing.min.js",integrity:"sha384-nOg4TW2SG7+ChoY+hVJJjLwLlnood85Xw4eFnH7/3VUmhvQCBlXO4KHlLkV/4JmG",config:{dsn:"https://eb81220a919a4fb1b67c2de654f83b6c@o1081074.ingest.sentry.io/6088043",debug:!0,environment:"development",release:"test",sampleRate:1},performance:!0,tracingOptions:{tracingOrigins:["localhost","Valerioageno.github.io",/^\//]},children:Object(d.jsx)(l.a,{children:Object(d.jsx)(x,{})})})}),document.getElementById("root")),y()},8:function(e,n,t){}},[[19,1,2]]]);
//# sourceMappingURL=main.47261260.chunk.js.map