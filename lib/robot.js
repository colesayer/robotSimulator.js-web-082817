'use strict';
const directions = [ 'north', 'east', 'south', 'west' ]
const Robot = (function () {
  return class{
    constructor(bearing){
      this.orient = function(currentDirection){

          if(directions.includes(currentDirection)){
          this.bearing = currentDirection
          } else {
            throw new Error("Invalid Robot Bearing")
          }
      }
    }

    turnRight(){
      switch (this.bearing) {
        case 'north':
          this.bearing = 'east'
          break;
        case 'east':
          this.bearing = 'south'
            break;
        case 'south':
          this.bearing = 'west'
          break;
        case 'west':
          this.bearing = 'north'
          break;
      }
    }

    turnLeft(){
      switch (this.bearing) {
        case 'north':
          this.bearing = 'west'
          break;
        case 'west':
          this.bearing = 'south'
          break;
        case 'south':
          this.bearing = 'east'
          break;
        case 'east':
          this.bearing = 'north'
          break;
      }
    }

    at(x, y){
      this.coordinates = [];
      this.coordinates[0] = x;
      this.coordinates[1] = y;
    }

    advance(){
      switch (this.bearing) {
        case 'north':
          this.coordinates[1] += 1;
          break;
        case 'south':
          this.coordinates[1] -= 1;
          break;
        case 'east':
          this.coordinates[0] += 1;
          break;
        case 'west':
          this.coordinates[0] -= 1;
          break;
      }
    }

    instructions(input){
      let dir = input.split("")
      let execution = [];
      for(const ele of dir){
        switch (ele) {
          case "L":
            execution.push("turnLeft")
            break;
          case "R":
            execution.push("turnRight")
            break;
          case "A":
            execution.push("advance")
            break;
        }
      }
      return execution;
    }

    place(obj){
      this.at(obj.x, obj.y);
      this.orient(obj.direction)
    }

    evaluate(str){
      let exec = this.instructions(str)
      for(const ele of exec){
        this[ele]();
      }
    }
  }

})();
