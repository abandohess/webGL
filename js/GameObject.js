"use strict";
let GameObject = function(mesh) {
  this.mesh = mesh;

  this.position = new Vec3(0, 0, 0);
  this.orientation = 0;
  this.scale = new Vec3(1, 1, 1);

  this.modelMatrix = new Mat4();
};

GameObject.prototype.updateModelMatrix = function(){
  this.modelMatrix.set().rotate(this.orientation).scale(this.scale).translate(this.position);
};

// GameObject.prototype.draw = function(){
//
//   this.updateModelMatrix();
// // TODO: Set the uniform modelViewProjMatrix (reflected in the material) from the modelMatrix (no camera yet). Operator = cannot be used. Use Mat4 methods set() and/or mul().
//   this.mesh.material.modelViewProjMatrix.set(this.modelMatrix);
//   this.mesh.draw();
// };

GameObject.prototype.draw = function(camera){
  this.updateModelMatrix();
  this.mesh.material.modelViewProjMatrix.set(this.modelMatrix.mul(camera.viewProjMatrix));
  this.mesh.draw();
};
