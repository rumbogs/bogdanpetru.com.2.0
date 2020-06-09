import vertexShaderSource from './shaders/glRaytracer/vertexShader.glsl';
import fragmentShaderSource from './shaders/glRaytracer/fragmentShader.glsl';

console.log('fragmentShaderSource', fragmentShaderSource);

const canvasEl = document.querySelector('.webgl-canvas');
const width = canvasEl.clientWidth;
const height = canvasEl.clientHeight;

const glContext = canvasEl.getContext('webgl');


glContext.canvas.width = width;
glContext.canvas.height = height;

glContext.viewport(0, 0, width, height);

glContext.clear(glContext.COLOR_BUFFER_BIT);

glContext.useProgram(this.program);

glContext.enableVertexAttribArray(this.positionLocation);

glContext.bufferData(
  glContext.ARRAY_BUFFER,
  new Float32Array([0, 0, width, 0, 0, height, 0, height, width, 0, width, height]),
  glContext.STATIC_DRAW,
);

const size = 2;
const type = glContext.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;
glContext.vertexAttribPointer(this.positionLocation, size, type, normalize, stride, offset);

glContext.uniform2f(this.resolutionLocation, width, height);
glContext.uniform2f(this.mousePosLocation, 0, 0);

const primitiveType = glContext.TRIANGLES;
const count = 6;
glContext.drawArrays(primitiveType, offset, count);
