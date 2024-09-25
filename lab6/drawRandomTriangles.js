function createShader(gl, type, source) {
    var shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success){
        return shader
    }

    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}

function createProgram(gl, vertexShader, fragmentShader){
    var program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    var success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if(success){
        return program
    }

    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
}

function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
        canvas.width  = width;
        canvas.height = height;
        return true;
    }
    return false;
    }

function randomInt(range) {
    return Math.floor(Math.random() * range);
}

function setTriangle(gl, arr1, arr2, arr3){
    var x1 = arr1[0];
    var x2 = arr2[0];
    var x3 = arr3[0];

    var y1 = arr1[1];
    var y2 = arr2[1];
    var y3 = arr3[1];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
        x1, y1,
        x2, y2,
        x3, y3,
    ), gl.STATIC_DRAW);
}

function initGL(canvasId){
    var canvas = document.getElementById(canvasId);
    var gl = canvas.getContext("webgl2");
    if (!gl) {
        return;
    }
    return gl
}

var vertexShaderSource = `#version 300 es 

in vec2 a_position;

uniform vec2 u_resolution;

void main() {

    vec2 zeroToOne = a_position / u_resolution;

    vec2 zeroToTwo = zeroToOne * 2.0;

    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}`;

var fragmentShaderSource = `#version 300 es 

precision highp float;

uniform vec4 u_color;

out vec4 outColor;

void main()
{
    outColor = u_color;
}`;

function drawRandomTriangles(canvasId){

  var gl = initGL(canvasId)
  console.log(gl)

  vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

  var program = createProgram(gl, vertexShader, fragmentShader)


  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");


  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");


  var colorLocation = gl.getUniformLocation(program, "u_color");


  var positionBuffer = gl.createBuffer();


  var vao = gl.createVertexArray();


  gl.bindVertexArray(vao);


  gl.enableVertexAttribArray(positionAttributeLocation);


  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


  var size = 2;          
  var type = gl.FLOAT;   
  var normalize = false; 
  var stride = 0;        
  var offset = 0;        
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset);

  resizeCanvasToDisplaySize(gl.canvas);


  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);


  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  gl.useProgram(program);


  gl.bindVertexArray(vao);

  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);


  for (var ii = 0; ii < 5; ++ii) {
    randArr = []
    for(var i = 0; i < 6; i = i + 1){
        randArr.push(randomInt(150))
    }

    setTriangle(
        gl, randArr);

    gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
  }
}


function randomInt(range) {
  return Math.floor(Math.random() * range);
}


function setTriangle(gl, arrXY) {
  var x1 = arrXY[0]
  var x2 = arrXY[2]
  var x3 = arrXY[4]
  var y1 = arrXY[1]
  var y2 = arrXY[3]
  var y3 = arrXY[5]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y2,
     x3, y3,
  ]), gl.STATIC_DRAW);
}

drawRandomTriangles("canvasRandomTriangles");