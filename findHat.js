const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let startX;
let startY;


class Field {
  constructor(field){
    this.field = field;
  }

  print(){
    let fieldArr = this.field;
    let str='';
    fieldArr.forEach(element => str += element.join('') + '\n');
    console.log(str);
  }

  playGame(){
    let y = startY; 
    let x = startX;
    const msg = ('Which direction would you like to move? Please enter U for Up, D for Down, R for Right, or L for Left. \n');
    this.print();

    while(this.field[y][x] === pathCharacter){
      let direction = prompt(msg);

      //checks for wall/borders and adds/subratcts y, x, values
      if(direction.toUpperCase() === 'U'){
        if(y <= 0){
          console.log('You cannot move any further Up')
          } else {
              y --;
          }
          } else if (direction.toUpperCase() === 'D'){
              if(y >= this.field.length){
                console.log('You cannot move any further Down')
              } else {
                y ++;
              }
          } else if(direction.toUpperCase() === 'R'){
              if(x >= this.field[0].length){
                console.log('You cannot move any further Right')
              } else {
                x ++;
              }
          } else if (direction.toUpperCase() === 'L'){
              if(x <= 0){
                console.log('You cannot move any further Left')
              } else {
                x --;
              }
          } else {
            console.log("invalid entry! Please enter U, D, R, or L")
          }

      //If statment - checks for win/lose
      if(this.field[y][x] === hat){
        return "You win!!"
        } else if(this.field[y][x] === hole){
          return "You lose!!";
        } else {
          this.field[y][x] = pathCharacter;
          this.print();
        }

    };
  }
  
  static generateField(height, width, holePercentage) {
    let newField = [];
    let randX = Math.floor(Math.random() * width);
    let randY = Math.floor(Math.random() * height);
    let holes = (height*width)*(holePercentage/100);

    //generate blank field
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < width; j++) {
          newField[i].push(fieldCharacter)
      };
    };
    //random hat placement
    newField[randY][randX] = hat;
    //random hole placement
    if(holePercentage > 0 && holePercentage <= 30){
      for (let k = holes; k > 0; k--) {
      let holeX = randX;
      let holeY = randY;
      while (holeX === randX) {
        holeX = Math.floor(Math.random() * width)
      };
      while (holeY === randY) {
        holeY = Math.floor(Math.random() * height)
      };
     newField[holeY][holeX] = hole; 
      }  
    } else {
      throw Error('You must enter a number <= 30 when setting the percentage of holes');
    }

    //generate random starting point
    startX = randX;
    startY = randY;
    while(startX === randX){
      startX = Math.floor(Math.random() * width)
    }
    while(startY === randY){
      startY = Math.floor(Math.random() * height)
    newField[startY][startX] = pathCharacter;
    return newField;
    }
  } 


}


//setup current field on static method
const currentField = Field.generateField(8, 10, 25) ;

//create new class for current game
const myField = new Field(currentField);
console.log(myField.playGame());