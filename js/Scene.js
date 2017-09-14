"use strict";
let Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);

  this.triangleGeometry1 = new TriangleGeometry(gl);
  // this.triangleGeometry2 = new TriangleGeometry(gl);

  this.trianglePosition1 = new Vec3(0, 0, 0);

  this.direction = .8;

  // this.trianglePosition2 = {x:0, y:0, z:0};
  this.timeAtLastFrame = new Date().getTime();
};

Scene.prototype.update = function(gl, keysPressed) {
  let timeAtThisFrame = new Date().getTime();
  let dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  var dx = this.direction * dt;
  var dy = this.direction * dt;

  if (keysPressed["LEFT"]) {
    var differenceVector = new Vec3(-dx, 0, 0);
    this.trianglePosition1.add(differenceVector);
  }
  else if (keysPressed["RIGHT"]) {
    var differenceVector = new Vec3(dx, 0, 0);
    this.trianglePosition1.add(differenceVector);
  }
  if (keysPressed["DOWN"]) {
    var differenceVector = new Vec3(0, -dy, 0);
    this.trianglePosition1.add(differenceVector);
  }
  else if (keysPressed["UP"]) {
    var differenceVector = new Vec3(0, dy, 0);
    this.trianglePosition1.add(differenceVector);
  }

  

  // clear the screen
  gl.clearColor(0.6, 0.0, 0.3, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  this.solidProgram.commit();

  var trianglePositionLocation1 = gl.getUniformLocation(this.solidProgram.glProgram, "trianglePosition1");
  if(trianglePositionLocation1 < 0) console.log("Could not find uniform trianglePosition1.");
  else if(this.trianglePosition1.x > 1.7) {
    this.trianglePosition1 = new Vec3(-1.7, 0, 0);
  }
  else {
    this.trianglePosition1.commit(gl, trianglePositionLocation1);
  }

  this.triangleGeometry1.draw();


};
