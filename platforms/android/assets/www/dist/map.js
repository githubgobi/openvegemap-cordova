var oldbrowser=function(){"use strict";function e(){"function"!=typeof MutationObserver&&(document.getElementsByTagName("body")[0].innerHTML='Your browser does not support <a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">MutationObserver</a>. Please update your browser.')}return{init:function(){e()}}}();if("object"!=typeof L)throw"Leaflet is not loaded";L.DomEvent.on(window,"load",oldbrowser.init);var openvegemap=function(){"use strict";function e(e,t){var o="diet:"+e;return!(!t[o]||"yes"!==t[o]&&"only"!==t[o])}function t(e,t){var o="diet:"+e;return!(!t[o]||"no"!==t[o])}function o(e,t){var o="diet:"+e;return!(!t[o]||"only"!==t[o])}function n(e,t){return t?'<ons-list-item modifier="nodivider"><div class="left">'+e+'</div> <div class="right">'+t.replace(/_/g," ")+"</div></ons-list-item>":""}function a(e){return'<ons-list-item id="hoursBtn" tappable modifier="chevron"><div class="left">Opening hours<br/>('+new window.opening_hours(e,null).getStateString(new Date,!0)+")</div></ons-list-item>"}function r(e){return e.getHours().toString().padStart(2,0)+":"+e.getMinutes().toString().padStart(2,0)}function i(e){return e.toLocaleDateString("en-US",{weekday:"long"})}function l(e,t){var o="";if(e-t>Q)for(var n=t;n.getDay()<e.getDay();)(1===n.getDay()||n.getDay()>t.getDay())&&(o+="<tr><th>"+i(n)+'</th><td colspan="2">Closed</td></tr>'),n=new Date(n.getTime()+Q);return o}function s(e,t,o,n,a){var l="";return e.getState(o)&&(l+="<tr><th>",a!==n&&(l+=i(o)),l+="</th><td>"+r(o)+"<td>"+r(t)+"</td></tr>"),l}function c(e){var t,o,n=new window.opening_hours(e,null),a=n.getIterator(),r="",i=new Date(2017,0,2),c=i,g=new Date(2017,0,1);for(a.setDate(i),o=new Date(i.getTime()+X);a.advance(o);)r+=s(n,i=a.getDate(),c,t=c.getDay(),g),r+=l(i,c),n.getState(c)&&g!==t&&(g=t),c=i;return 0===i.getDay()?(a.advance(),r+=s(n,i,c,t=c.getDay(),g)):r+='<tr><th>Sunday</th><td colspan="2">Closed<td></tr>',r||(r+="<tr><th>Sorry, we don't have enough info</th></tr>"),r}function g(){$[this.dialog].show(this.target),Y[this.dialog]&&"function"==typeof Y[this.dialog].show&&Y[this.dialog].show()}function u(e){var t="",o=L.DomUtil.create("a");return t+=n("Vegan",e["diet:vegan"]),t+=n("Vegetarian",e["diet:vegetarian"]),e.cuisine&&(t+=n("Cuisine",e.cuisine.replace(/;/g,", "))),t+=n("Take away",e.takeaway),e.phone&&(t+=n("Phone number",'<a href="tel:'+e.phone+'">'+e.phone.replace(/\s/g,"&nbsp;")+"</a>")),e.website&&(o.href=e.website,"localhost"===o.hostname&&(e.website="http://"+e.website),t+=n("Website",'<a target="_blank" href="'+e.website+'">'+e.website+"</a>")),e.opening_hours&&(t+=a(e.opening_hours)),t}function d(e){var t="";if(t+=u(e.target.feature.tags),e.target.feature.tags.opening_hours&&(L.DomUtil.get("hoursTable").innerHTML=c(e.target.feature.tags.opening_hours)),e.target.feature.tags.name||(e.target.feature.tags.name=""),L.DomUtil.get("mapPopupTitle").innerHTML=e.target.feature.tags.name,L.DomUtil.get("mapPopupList").innerHTML=t,L.DomUtil.get("gmapsLink").setAttribute("href","https://www.google.fr/maps/dir//"+e.target.feature.lat+","+e.target.feature.lon),L.DomUtil.get("editLink").setAttribute("href","https://editor.openvegemap.netlib.re/"+e.target.feature.type+"/"+e.target.feature.id),e.target.feature.tags.opening_hours){var o=L.DomUtil.get("hoursBtn");L.DomEvent.on(o,"click",g,{dialog:"hoursPopup",target:o})}L.DomUtil.get("mapPopup").show()}function f(e){switch(e.shop){case"bakery":return"🥖";default:return"🛒"}}function m(e){switch(e.craft){case"caterer":return"🍴";default:return""}}function p(e){switch(e.amenity){case"fast_food":return"🍔";case"restaurant":return"🍴";case"cafe":return"🍵";case"bar":return"🍸";case"pub":return"🍺";default:return""}}function h(e){return e.shop?f(e):e.craft?m(e):e.amenity?p(e):""}function v(t){return o("vegan",t)?j["vegan-only"]:e("vegan",t)?j.vegan:o("vegetarian",t)?j["vegetarian-only"]:e("vegetarian",t)?j.vegetarian:j.other}function D(n){return o("vegan",n)?"dot-circle-o":e("vegan",n)?"circle":e("vegetarian",n)?"circle-o":t("vegetarian",n)?"ban":"question"}function w(o){return e("vegan",o)?"green":e("vegetarian",o)?"darkgreen":t("vegetarian",o)?"red":"gray"}function b(e){if(-1===W.indexOf(e.id)){W.push(e.id),e.center&&(e.lat=e.center.lat,e.lon=e.center.lon);var t=L.marker([e.lat,e.lon]);t.feature=e,t.setIcon(L.AwesomeMarkers.icon({icon:D(e.tags),prefix:"fa",markerColor:w(e.tags)})),t.on("click",d),e.tags.name&&t.bindTooltip(h(e.tags)+"&nbsp;"+e.tags.name,{direction:"bottom"}),t.addTo(v(e.tags))}}function y(){G.hide()}function k(){G.show()}function U(){F.open()}function E(){N.locate({setView:!0,enableHighAccuracy:!0}),F.close()}function S(){R._geocode()}function T(e){var t=L.circle(e.geocode.center,10);t.addTo(N),N.fitBounds(t.getBounds()),$.geocodeDialog.hide(),F.close()}function _(e){e.elements.forEach(b)}function M(e){$[e.id]=e,Y[e.id]&&"function"==typeof Y[e.id].init&&Y[e.id].init()}function A(e){j[e].removeFrom(N)}function I(e){j[e].addTo(N)}function P(){var e=[];J.forEach(A),J.forEach(function(t){var o=L.DomUtil.get(t+"-filter");o&&o.checked&&e.push(t)}),e.forEach(I),window.localStorage.setItem("filters",JSON.stringify(e)),$.filtersDialog.hide(),F.close()}function x(){var e=JSON.parse(window.localStorage.getItem("filters"));return e||(e=["vegan","vegan-only","vegetarian","vegetarian-only"]),e}function B(e){j[e]=L.layerGroup()}function C(){J.forEach(B)}function O(e){var t=e.target.getZoom();t>=15&&K?($.zoomToast.hide(),K=!1):t<15&&!K&&($.zoomToast.show(),K=!0)}function z(){(R=new L.Control.Geocoder({geocoder:new L.Control.Geocoder.Nominatim({serviceUrl:"https://nominatim.openstreetmap.org/"}),position:"topleft",defaultMarkGeocode:!1}).on("markgeocode",T))._alts=L.DomUtil.get("geocodeAlt"),R._container=$.geocodeDialog,R._errorElement=L.DomUtil.get("geocodeError"),R._input=L.DomUtil.get("geocodeInput"),L.DomEvent.on(L.DomUtil.get("geocodeDialogBtn"),"click",S)}function V(){L.DomEvent.on(L.DomUtil.get("filtersDialogBtn"),"click",P)}function q(e){L.DomUtil.get(e+"-filter").checked=!0}function H(){x().forEach(q)}function Z(){O({target:N})}var N,G,F,R,W=[],j={},J=["vegan-only","vegan","vegetarian-only","vegetarian","other"],$={},Y={},K=!1,Q=864e5,X=7*Q;return{init:function(){F=L.DomUtil.get("menu"),N=L.map("map",{center:[48.85661,2.351499],zoom:16,maxZoom:19,minZoom:3,maxBounds:[[-90,-180],[90,180]],maxBoundsViscosity:1}),G=L.control.loader().addTo(N);var e=L.UrlUtil.hash();L.DomEvent.on(L.DomUtil.get("menuBtn"),"click",U),L.DomEvent.on(L.DomUtil.get("geocodeMenuItem"),"click",g,{dialog:"geocodeDialog"}),L.DomEvent.on(L.DomUtil.get("filtersMenuItem"),"click",g,{dialog:"filtersDialog"}),L.DomEvent.on(L.DomUtil.get("locateMenuItem"),"click",E),L.DomEvent.on(L.DomUtil.get("aboutMenuItem"),"click",g,{dialog:"aboutDialog"}),L.tileLayer("https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",{detectRetina:!0,maxNativeZoom:18,maxZoom:20,attribution:'&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & <a target="_blank" href="https://maps.wikimedia.org/">Wikimedia maps</a>'}).addTo(N),L.UrlUtil.queryParse(e).lat&&window.localStorage.setItem("paramsTemp",e),N.addControl(new L.Control.Permalink({useLocation:!0,useLocalStorage:!0})),N.addControl(new InfoControl({position:"bottomright",content:'<i class="fa fa-circle" style="background-color: #72AF26"></i> Vegan<br/><i class="fa fa-dot-circle-o" style="background-color: #72AF26"></i> Vegan only<br/><i class="fa fa-circle-o" style="background-color: #728224"></i> Vegetarian<br/><i class="fa fa-ban" style="background-color: #D63E2A"></i> Meat only<br/><i class="fa fa-question" style="background-color: #575757"></i> Unknown<br/>'})),new L.OverPassLayer({endPoint:"https://overpass-api.de/api/",query:'node({{bbox}})[~"^diet:.*$"~"."];out;way({{bbox}})[~"^diet:.*$"~"."];out center;',beforeRequest:k,afterRequest:y,onSuccess:_,minZoomIndicatorEnabled:!1}).addTo(N),C(),x().forEach(I),Y={geocodeDialog:{init:z},filtersDialog:{init:V,show:H},zoomToast:{init:Z}},ons.createAlertDialog("templates/about.html").then(M),ons.createAlertDialog("templates/geocode.html").then(M),ons.createAlertDialog("templates/filters.html").then(M),ons.createAlertDialog("templates/popup.html").then(M),ons.createAlertDialog("templates/zoom.html").then(M),ons.createAlertDialog("templates/hours.html").then(M),N.on("zoom",O)}}}();if("object"!=typeof ons)throw"Onsen is not loaded";ons.ready(openvegemap.init);
//# sourceMappingURL=map.js.map