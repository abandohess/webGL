"use strict";
let Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);

  this.triangleGeometry1 = new TriangleGeometry(gl);
  // this.triangleGeometry2 = new TriangleGeometry(gl);

  this.trianglePosition1 = {x:0, y:0, z:0};


  // this.trianglePosition2 = {x:0, y:0, z:0};
  this.timeAtLastFrame = new Date().getTime();

  this.offset = 0;
};

Scene.prototype.update = function(gl, keysPressed) {
  let timeAtThisFrame = new Date().getTime();
  let dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  var dx = 0.2 * dt;
  this.trianglePosition1.x += dx;
  this.offset += dx;
  // this.trianglePosition2.x -= 0.2 * dt;

  // clear the screen
  gl.clearColor(0.6, 0.0, 0.3, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  this.solidProgram.commit();

  var trianglePositionLocation1 = gl.getUniformLocation(this.solidProgram.glProgram, "trianglePosition1");
  if(trianglePositionLocation1 < 0) console.log("Could not find uniform trianglePosition1.");
  else if(this.trianglePosition1.x > 1.7) {
    this.offset = -1.7 - (this.trianglePosition1.x - this.offset);
    this.trianglePosition1.x = 0-1.7;
  }
  else {
    // console.log(this.trianglePosition1.x);
    gl.uniform3f(trianglePositionLocation1,
      this.trianglePosition1.x, this.trianglePosition1.y,
      this.trianglePosition1.z);
    // this.trianglePosition1.commit(trianglePositionLocation1);
  }

//   var trianglePositionLocation2 = gl.getUniformLocation(this.solidProgram.glProgram, "trianglePosition2");
//   if(trianglePositionLocation2 < 0) console.log("Could not find uniform trianglePosition2.");
//   else if(this.trianglePosition2.x < -1.7) {
//     this.trianglePosition2.x = 1.7;
//   }
//   else {
//     // console.log(this.trianglePosition1.x);
//     gl.uniform3f(trianglePositionLocation2,
//       this.trianglePosition2.x, this.trianglePosition2.y,
//       this.trianglePosition2.z);
//   }

  this.triangleGeometry1.draw();

  this.trianglePosition1.x -= (.2 * dt + this.offset);
  //console.log(this.offset);
  this.offset += .2 * dt;
  if(trianglePositionLocation1 < 0) console.log("Could not find uniform trianglePosition1.");
  else if(this.trianglePosition1.x < -1.7) {
    this.offset = (this.trianglePosition1.x + this.offset) - 1.7;
    this.trianglePosition1.x = 1.7;
  }
  else {
    // console.log(this.trianglePosition1.x);
    gl.uniform3f(trianglePositionLocation1,
      this.trianglePosition1.x, this.trianglePosition1.y,
      this.trianglePosition1.z);
  }

  this.triangleGeometry1.draw();

  this.trianglePosition1.x += this.offset;

};
