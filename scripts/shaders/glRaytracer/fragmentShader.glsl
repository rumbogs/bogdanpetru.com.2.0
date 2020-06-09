precision mediump float;

uniform vec2 u_mousePos;
varying vec2 u_fragRes;

#pragma glslify: import('./includes/camera')
#pragma glslify: import('./includes/ray')
#pragma glslify: import('./includes/mesh')
#pragma glslify: import('./includes/mesh_list')

#define FLT_MAX 3.402823466e+38
#define FLT_MIN 1.175494351e-38
#define DBL_MAX 1.7976931348623158e+308
#define DBL_MIN 2.2250738585072014e-308
#define WORLD_SIZE 2
#define ANTIALIASING_SENSIBILITY 100

vec3 origin = vec3(0., 0., 0.);
vec3 vertical = vec3(0., 2., 0.);
vec3 horizontal = vec3(4., 0., 0.);
vec3 lower_left_corner = vec3(-2., -1., -1.);

float random(in float seed)
{
    seed = fract(seed * .1031);
    seed *= seed + 19.19;
    seed *= seed + seed;
    return fract(seed);
}

vec3 color(const in Ray ray, const in Mesh world[WORLD_SIZE]) {
  float t;
  vec3 p;
  vec3 normal;
  if (mesh_list_hit(world, ray, 0.0, FLT_MAX, t, p, normal)) {
    return 0.5 * vec3(normal.x + 1., normal.y + 1., normal.z + 1.);
  } else {
    vec3 unit_direction = normalize(ray.direction);
    t = 0.5 * (unit_direction.y + 1.);
    vec3 white = vec3(1., 1., 1.);
    vec3 sky_blue = vec3(0.5, 0.7, 1.);
    return mix(white, sky_blue, t);
  }
}

void main() {
  vec2 st = gl_FragCoord.xy / u_fragRes.xy; // 0 -> 1
  // Ray ray = Ray(origin, lower_left_corner + st.x * horizontal + st.y * vertical);
  Camera camera = Camera(origin, lower_left_corner, horizontal, vertical);
  Mesh world[WORLD_SIZE];
  world[0] = Mesh(0, vec3(0., 0., -1.), 0.5);
  world[1] = Mesh(0, vec3(0., -100.5, -1.), 100.);
  vec3 col = vec3(0., 0., 0.);
  for (int i = 0; i < ANTIALIASING_SENSIBILITY; i++) {
    float u = st.x + random(float(i)) / u_fragRes.x;
    // needs to be different than first seed otherwise we have artifacts
    float v = st.y + random(float(i) + 1.0) / u_fragRes.y;
    Ray ray = get_ray(camera, u, v);
    col += color(ray, world);
  }
  col /= float(ANTIALIASING_SENSIBILITY);

  gl_FragColor = vec4(col, 1.);
}
