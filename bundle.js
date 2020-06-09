'use strict';

/* Font Face Observer v2.1.0 - © Bram Stein. License: BSD-3-Clause */(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b);}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a();}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a();});}function t(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c);}
function u(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";";}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=k;z(a)&&a.a.parentNode&&b(a.g);}var k=a;l(a.b,c);l(a.c,c);z(a);}function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal";}var C=null,D=null,E=null,F=null;function G(){if(null===D)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);D=!!a&&603>parseInt(a[1],10);}else D=!1;return D}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif";}catch(b){}E=""!==a.style.font;}return E}function L(a,b){return [a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,k=a||"BESbswy",r=0,n=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=n?b(Error(""+n+"ms timeout exceeded")):document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25);},b);}e();}),N=new Promise(function(a,c){r=setTimeout(function(){c(Error(""+n+"ms timeout exceeded"));},n);});Promise.race([N,M]).then(function(){clearTimeout(r);a(c);},
b);}else m(function(){function v(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==w&&g==w&&h==w||f==x&&g==x&&h==x||f==y&&g==y&&h==y)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c));}function I(){if((new Date).getTime()-H>=n)d.parentNode&&d.parentNode.removeChild(d),b(Error(""+
n+"ms timeout exceeded"));else {var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=p.a.offsetWidth,h=q.a.offsetWidth,v();r=setTimeout(I,50);}}var e=new t(k),p=new t(k),q=new t(k),f=-1,g=-1,h=-1,w=-1,x=-1,y=-1,d=document.createElement("div");d.dir="ltr";u(e,L(c,"sans-serif"));u(p,L(c,"serif"));u(q,L(c,"monospace"));d.appendChild(e.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);w=e.a.offsetWidth;x=p.a.offsetWidth;y=q.a.offsetWidth;I();A(e,function(a){f=a;v();});u(e,
L(c,'"'+c.family+'",sans-serif'));A(p,function(a){g=a;v();});u(p,L(c,'"'+c.family+'",serif'));A(q,function(a){h=a;v();});u(q,L(c,'"'+c.family+'",monospace'));});})};"object"===typeof module?module.exports=B:(window.FontFaceObserver=B,window.FontFaceObserver.prototype.load=B.prototype.load);}());

var fontASubset = new FontFaceObserver('LibreFranklinSubset');
var fontBSubset = new FontFaceObserver('LibreBaskervilleSubset');
Promise.all([fontASubset.load(), fontBSubset.load()]).then(function () {
  document.documentElement.className += ' fonts-stage-1';
  var fontA = new FontFaceObserver('LibreFranklin');
  var fontB = new FontFaceObserver('LibreBaskerville');
  Promise.all([fontA.load(), fontB.load()]).then(function () {
    document.documentElement.className += ' fonts-stage-2';
  });
});

var fragmentShaderSource = "precision mediump float;\n#define GLSLIFY 1\nuniform vec2 u_mousePos;varying vec2 u_fragRes;struct Camera{vec3 origin;vec3 lower_left_corner;vec3 horizontal;vec3 vertical;};Ray get_ray(const in Camera camera,const in float u,const in float v){return Ray(camera.origin,camera.lower_left_corner + u * camera.horizontal + v * camera.vertical - camera.origin);}struct Ray{vec3 origin;vec3 direction;};vec3 point_at_parameter(const in Ray ray,const in float t){return ray.origin + t * ray.direction;}struct Mesh{int type;vec3 center;float radius;};bool mesh_hit(const in Mesh mesh,const in Ray ray,const in float t_min,const in float t_max,inout float t,inout vec3 p,inout vec3 normal){if(mesh.type == 0){// SPHERE vec3 oc=ray.origin - mesh.center;float a=dot(ray.direction,ray.direction);float b=dot(oc,ray.direction);float c=dot(oc,oc)- pow(mesh.radius,2.);float discriminant=pow(b,2.)- a * c;if(discriminant > 0.){float temp=(-b - sqrt(discriminant))/ a;if(temp < t_max && temp > t_min){t=temp;p=point_at_parameter(ray,t);normal=(p - mesh.center)/ mesh.radius;return true;}temp=(-b + sqrt(discriminant))/ a;if(temp < t_max && temp > t_min){t=temp;p=point_at_parameter(ray,t);normal=(p - mesh.center)/ mesh.radius;return true;}}}return false;}\n#define WORLD_SIZE 2\nbool mesh_list_hit(const in Mesh world[WORLD_SIZE],const in Ray ray,const in float t_min,const in float t_max,inout float t,inout vec3 p,inout vec3 normal){float temp_t;vec3 temp_p;vec3 temp_normal;bool hit_anything=false;float closest_so_far=t_max;for(int i=0;i < WORLD_SIZE;i++){if(mesh_hit(world[i],ray,t_min,closest_so_far,temp_t,temp_p,temp_normal)){hit_anything=true;closest_so_far=temp_t;t=temp_t;p=temp_p;normal=temp_normal;}}return hit_anything;}\n#define FLT_MAX 3.402823466e+38\n#define FLT_MIN 1.175494351e-38\n#define DBL_MAX 1.7976931348623158e+308\n#define DBL_MIN 2.2250738585072014e-308\n#define WORLD_SIZE 2\n#define ANTIALIASING_SENSIBILITY 100\nvec3 origin=vec3(0.,0.,0.);vec3 vertical=vec3(0.,2.,0.);vec3 horizontal=vec3(4.,0.,0.);vec3 lower_left_corner=vec3(-2.,-1.,-1.);float random(in float seed){seed=fract(seed * .1031);seed *= seed + 19.19;seed *= seed + seed;return fract(seed);}vec3 color(const in Ray ray,const in Mesh world[WORLD_SIZE]){float t;vec3 p;vec3 normal;if(mesh_list_hit(world,ray,0.0,FLT_MAX,t,p,normal)){return 0.5 * vec3(normal.x + 1.,normal.y + 1.,normal.z + 1.);}else{vec3 unit_direction=normalize(ray.direction);t=0.5 *(unit_direction.y + 1.);vec3 white=vec3(1.,1.,1.);vec3 sky_blue=vec3(0.5,0.7,1.);return mix(white,sky_blue,t);}}void main(){vec2 st=gl_FragCoord.xy / u_fragRes.xy;// 0 -> 1 // Ray ray = Ray(origin, lower_left_corner + st.x * horizontal + st.y * vertical); Camera camera=Camera(origin,lower_left_corner,horizontal,vertical);Mesh world[WORLD_SIZE];world[0]=Mesh(0,vec3(0.,0.,-1.),0.5);world[1]=Mesh(0,vec3(0.,-100.5,-1.),100.);vec3 col=vec3(0.,0.,0.);for(int i=0;i < ANTIALIASING_SENSIBILITY;i++){float u=st.x + random(float(i))/ u_fragRes.x;// needs to be different than first seed otherwise we have artifacts float v=st.y + random(float(i)+ 1.0)/ u_fragRes.y;Ray ray=get_ray(camera,u,v);col += color(ray,world);}col /= float(ANTIALIASING_SENSIBILITY);gl_FragColor=vec4(col,1.);}";

console.log('fragmentShaderSource', fragmentShaderSource);
var canvasEl = document.querySelector('.webgl-canvas');
var width = canvasEl.clientWidth;
var height = canvasEl.clientHeight;
var glContext = canvasEl.getContext('webgl');
glContext.canvas.width = width;
glContext.canvas.height = height;
glContext.viewport(0, 0, width, height);
glContext.clear(glContext.COLOR_BUFFER_BIT);
glContext.useProgram(undefined.program);
glContext.enableVertexAttribArray(undefined.positionLocation);
glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array([0, 0, width, 0, 0, height, 0, height, width, 0, width, height]), glContext.STATIC_DRAW);
var size = 2;
var type = glContext.FLOAT;
var normalize = false;
var stride = 0;
var offset = 0;
glContext.vertexAttribPointer(undefined.positionLocation, size, type, normalize, stride, offset);
glContext.uniform2f(undefined.resolutionLocation, width, height);
glContext.uniform2f(undefined.mousePosLocation, 0, 0);
var primitiveType = glContext.TRIANGLES;
var count = 6;
glContext.drawArrays(primitiveType, offset, count);

var btnEl = document.querySelector('.theme-btn');
btnEl.addEventListener('click', function () {
  var classes = document.body.classList;
  classes.toggle('dark');
  classes.toggle('light');
});
