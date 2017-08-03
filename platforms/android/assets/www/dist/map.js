var openvegemap=function(){"use strict";function e(e,t){var o="diet:"+e;return!(!t[o]||"yes"!==t[o]&&"only"!==t[o])}function t(e,t){var o="diet:"+e;return!(!t[o]||"no"!==t[o])}function o(e,t){var o="diet:"+e;return!(!t[o]||"only"!==t[o])}function a(e,t){return t?'<ons-list-item modifier="nodivider"><div class="left">'+e+'</div> <div class="right">'+t.replace(/_/g," ")+"</div></ons-list-item>":""}function n(e){var t="",o=L.DomUtil.create("a");t+=a("Vegan",e.target.feature.tags["diet:vegan"]),t+=a("Vegetarian",e.target.feature.tags["diet:vegetarian"]),e.target.feature.tags.cuisine&&(t+=a("Cuisine",e.target.feature.tags.cuisine.replace(/;/g,", "))),t+=a("Take away",e.target.feature.tags.takeaway),e.target.feature.tags.phone&&(t+=a("Phone number",'<a href="tel:'+e.target.feature.tags.phone+'">'+e.target.feature.tags.phone.replace(/\s/g,"&nbsp;")+"</a>")),e.target.feature.tags.website&&(o.href=e.target.feature.tags.website,"localhost"===o.hostname&&(e.target.feature.tags.website="http://"+e.target.feature.tags.website),t+=a("Website",'<a target="_blank" href="'+e.target.feature.tags.website+'">'+e.target.feature.tags.website+"</a>")),e.target.feature.tags.name||(e.target.feature.tags.name=""),L.DomUtil.get("mapPopupTitle").innerHTML=e.target.feature.tags.name,L.DomUtil.get("mapPopupList").innerHTML=t,L.DomUtil.get("gmapsLink").setAttribute("href","https://www.google.fr/maps/dir//"+e.target.feature.lat+","+e.target.feature.lon),L.DomUtil.get("editLink").setAttribute("href","https://editor.openvegemap.netlib.re/"+e.target.feature.type+"/"+e.target.feature.id),L.DomUtil.get("mapPopup").show()}function r(e){switch(e.shop){case"bakery":return"🥖"}if(e.shop)return"🛒";switch(e.craft){case"caterer":return"🍴"}switch(e.amenity){case"fast_food":return"🍔";case"restaurant":return"🍴";case"cafe":return"🍵";case"bar":return"🍸";case"pub":return"🍺";default:return""}}function i(t){return o("vegan",t)?M["vegan-only"]:o("vegetarian",t)?M["vegetarian-only"]:e("vegan",t)?M.vegan:e("vegetarian",t)?M.vegetarian:M.other}function l(a){return o("vegan",a)?"dot-circle-o":e("vegan",a)?"circle":e("vegetarian",a)?"circle-o":t("vegetarian",a)?"ban":"question"}function g(o){return e("vegan",o)?"green":e("vegetarian",o)?"darkgreen":t("vegetarian",o)?"red":"gray"}function s(e){if(-1===x.indexOf(e.id)){x.push(e.id),e.center&&(e.lat=e.center.lat,e.lon=e.center.lon);var t=L.marker([e.lat,e.lon]);t.feature=e,t.setIcon(L.AwesomeMarkers.icon({icon:l(e.tags),prefix:"fa",markerColor:g(e.tags)})),t.on("click",n),e.tags.name&&t.bindTooltip(r(e.tags)+"&nbsp;"+e.tags.name,{direction:"bottom"}),t.addTo(i(e.tags))}}function c(){I.hide()}function u(){I.show()}function m(){_.open()}function f(){A._layer=new L.LayerGroup,A._layer.addTo(T),A._map=T,A._container=L.DomUtil.create("div"),A._icon=L.DomUtil.create("div"),A.start(),_.close()}function d(){E._geocode()}function p(e){var t=L.circle(e.geocode.center,10);t.addTo(T),T.fitBounds(t.getBounds()),B.geocodeDialog.hide(),_.close()}function h(e){e.elements.forEach(s)}function v(){B[this.dialog].show();var e=this.dialog+"Show";"function"==typeof openvegemap[e]&&openvegemap[e]()}function b(e){B[e.id]=e;var t=e.id+"Init";"function"==typeof openvegemap[t]&&openvegemap[t]()}function D(e){var t;for(t=0;t<z.length;t+=1)M[z[t]].removeFrom(T);for(t=0;t<z.length&&(e.endsWith("-only")&&!z[t].endsWith("-only")||M[z[t]].addTo(T),z[t]!==e);t+=1);window.localStorage.setItem("filter",e)}function w(){var e,t=document.getElementsByName("filter");for(e=0;e<t.length;e+=1)if(t[e].checked){D(t[e].getAttribute("input-id"));break}B.filtersDialog.hide(),_.close()}function y(){var e=window.localStorage.getItem("filter");return e||(e="vegetarian"),e}function k(){var e;for(e=0;e<z.length;e+=1)M[z[e]]=L.layerGroup()}function U(e){e.target.getZoom()>=15?B.zoomToast.hide():B.zoomToast.visible||B.zoomToast.show()}var T,I,_,A,E,x=[],M={},z=["vegan-only","vegan","vegetarian-only","vegetarian","other"],B={};return{geocodeDialogInit:function(){(E=new L.Control.Geocoder({geocoder:new L.Control.Geocoder.Nominatim({serviceUrl:"https://nominatim.openstreetmap.org/"}),position:"topleft",defaultMarkGeocode:!1}).on("markgeocode",p))._alts=L.DomUtil.get("geocodeAlt"),E._container=B.geocodeDialog,E._errorElement=L.DomUtil.get("geocodeError"),E._input=L.DomUtil.get("geocodeInput"),L.DomEvent.on(L.DomUtil.get("geocodeDialogBtn"),"click",d)},filtersDialogInit:function(){L.DomEvent.on(L.DomUtil.get("filtersDialogBtn"),"click",w)},filtersDialogShow:function(){L.DomUtil.get(y()).checked=!0},zoomToastInit:function(){U({target:T})},init:function(){_=L.DomUtil.get("menu"),T=L.map("map",{center:[48.85661,2.351499],zoom:16,maxZoom:19,minZoom:3,maxBounds:[[-90,-180],[90,180]],maxBoundsViscosity:1}),I=L.control.loader().addTo(T);var e=L.UrlUtil.hash();L.DomEvent.on(L.DomUtil.get("menuBtn"),"click",m),L.DomEvent.on(L.DomUtil.get("geocodeMenuItem"),"click",v,{dialog:"geocodeDialog"}),L.DomEvent.on(L.DomUtil.get("filtersMenuItem"),"click",v,{dialog:"filtersDialog"}),L.DomEvent.on(L.DomUtil.get("locateMenuItem"),"click",f),L.DomEvent.on(L.DomUtil.get("aboutMenuItem"),"click",v,{dialog:"aboutDialog"}),L.tileLayer("https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",{detectRetina:!0,maxNativeZoom:18,maxZoom:20,attribution:'&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & <a target="_blank" href="https://maps.wikimedia.org/">Wikimedia maps</a>'}).addTo(T),A=L.control.locate({position:"topright"}),L.UrlUtil.queryParse(e).lat&&window.localStorage.setItem("paramsTemp",e),T.addControl(new L.Control.Permalink({useLocation:!0,useLocalStorage:!0})),T.addControl(new InfoControl({position:"bottomright",content:'<i class="fa fa-circle" style="background-color: #72AF26"></i> Vegan<br/><i class="fa fa-dot-circle-o" style="background-color: #72AF26"></i> Vegan only<br/><i class="fa fa-circle-o" style="background-color: #728224"></i> Vegetarian<br/><i class="fa fa-ban" style="background-color: #D63E2A"></i> Meat only<br/><i class="fa fa-question" style="background-color: #575757"></i> Unknown<br/>'})),new L.OverPassLayer({endPoint:"https://overpass-api.de/api/",query:'node({{bbox}})[~"^diet:.*$"~"."];out;way({{bbox}})[~"^diet:.*$"~"."];out center;',beforeRequest:u,afterRequest:c,onSuccess:h,minZoomIndicatorEnabled:!1}).addTo(T),k(),D(y()),ons.createAlertDialog("templates/about.html").then(b),ons.createAlertDialog("templates/geocode.html").then(b),ons.createAlertDialog("templates/filters.html").then(b),ons.createAlertDialog("templates/popup.html").then(b),ons.createAlertDialog("templates/zoom.html").then(b),T.on("zoom",U)}}}();if("object"!=typeof ons)throw"Onsen is not loaded";ons.ready(openvegemap.init);
//# sourceMappingURL=map.js.map