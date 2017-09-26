"use strict";
let Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);

  // this.triangleGeometry2 = new TriangleGeometry(gl);

  this.trianglePosition1 = new Vec3(0, 0, 0);

  this.direction = .8;
  this.timeAtLastFrame = new Date().getTime();
  this.rotateChange = .05;
  // this.rotateVal = 0;
  // this.scaleVector = new Vec2(1, 1, 0);
  // this.scaleVectorChangeX = .1;
  // this.scaleVectorChangeY = .1;
  this.camera = new OrthoCamera();
  
  this.GameObjects = [];

  this.triangleGeometry = new TriangleGeometry(gl);
  this.material = new Material(gl, this.solidProgram);
  this.material.solidColor.set(.4, 2, .5);

  this.GameObjects.push(new GameObject(new Mesh(this.triangleGeometry, this.material)));

};

Scene.prototype.update = function(gl, keysPressed) {

  let timeAtThisFrame = new Date().getTime();
  let dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  var dx = this.direction * dt;
  var dy = this.direction * dt;

  if (keysPressed["LEFT"]) {
    var differenceVector = new Vec3(-dx, 0, 0);
    this.GameObjects[0].position.add(differenceVector);
  }
  else if (keysPressed["RIGHT"]) {
    var differenceVector = new Vec3(dx, 0, 0);
    this.GameObjects[0].position.add(differenceVector);
  }
  if (keysPressed["DOWN"]) {
    var differenceVector = new Vec3(0, -dy, 0);
    this.GameObjects[0].position.add(differenceVector);
  }
  else if (keysPressed["UP"]) {
    var differenceVector = new Vec3(0, dy, 0);
    this.GameObjects[0].position.add(differenceVector);
  }
  if (keysPressed["R"]) {
    this.GameObjects[0].orientation += this.rotateChange;
  }
  // if (keysPressed["S"]) {
  //   this.scaleVector.add(new Vec2(this.scaleVectorChangeX, this.scaleVectorChangeY, 0));
  // } else if (keysPressed["D"]) {
  //   this.scaleVector.add(new Vec2(-this.scaleVectorChangeX, -this.scaleVectorChangeY, 0));
  // }

  gl.clearColor(0.6, 0.0, 0.3, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  this.GameObjects[0].draw(this.camera);


  // clear the screen



  // this.material.modelMatrix.set().rotate(this.rotateVal).scale(this.scaleVector).translate(this.trianglePosition1);
  // this.material.commit();
  // this.triangleGeometry1.draw();



};
