function main(canvasId){
    var gl = document.getElementById(canvasId).getContext("webgl2")
    if(!gl){
        console.log("WebGL initializing error")
        return
    }

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

    var program = createProgram(gl, vertexShader, fragmentShader)


    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position")

    var positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // 6 2d точек в пространстве
    var positions = [
        10, 20,
        80, 20,
        10, 30,
        10, 30,
        80, 20,
        80, 30,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    var vao = gl.createVertexArray()

    gl.bindVertexArray(vao)

    gl.enableVertexAttribArray(positionAttributeLocation)

    var size = 2
    var type = gl.FLOAT
    var normalize = false
    var stride = 0
    var offset = 0

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

    resizeCanvasToDisplaySize(gl.canvas)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(program);

    gl.bindVertexArray(vao);

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
}