const {repeatString, alignRight, alignLeft, alignCentre, generateLine, zipArray} = require ('./patternsUtil.js');

const generateFilledRectangle = function (length,breadth) {
  return new Array(breadth).fill(repeatString('*',length));
}

const generateEmptyRectangle = function (length,breadth) {
  let result = new Array(breadth).fill(repeatString('*',length));
  for (let position=1; position<breadth-1; position++) {
    result[position] = generateLine(length,'*',' ','*');
  }
  result[result.length-1] = repeatString('*',length);
  return result;
}

const generateAlternatingRectangle = function (length,breadth) {
  let result = new Array(breadth).fill(repeatString('#',length));
  result.forEach(function(element,index) {
    if(index % 2 == 1) {
      result[index] = repeatString('*',length);
    }
  });
  return result;
}

const typesOfRectangle = {
  "filled": generateFilledRectangle,
  "filled_rectangle":generateFilledRectangle,
  "empty": generateEmptyRectangle,
  "empty_rectangle":generateEmptyRectangle,
  "alternating": generateAlternatingRectangle,
  "alternating_rectangle":generateAlternatingRectangle
}

const generateRectangle = function (parameters) {
  let typeOfRectangle = parameters['type'];
  let length = parameters['length'];
  let breadth = +parameters['breadth'];
  let drawRectangle = typesOfRectangle[typeOfRectangle]; 
  return drawRectangle(length, breadth);
}

const generateLATriangle = function (height) {
  let result = new Array(height).fill("");
  let count = 1;
  result = result.map(function (element){
    element = alignLeft(height,repeatString('*',count));
    count++;
    return element;
  });
  return result;
}

const generateRATriangle = function (height) {
  let result = new Array(height).fill("");
  let count = 1;
  result = result.map(function (element) {
    element = alignRight(height,repeatString('*',count));
    count++;
    return element;
  });
  return result;
}

const typesOfTriangle = {
  "left" : generateLATriangle,
  "left_triangle": generateLATriangle,
  "right" : generateRATriangle,
  "right_triangle": generateRATriangle
}

const generateTriangle = function (parameters) {
  let typeOfTriangle = parameters.type;
  let heightOfTriangle = parameters.height;
  let drawTriangle = typesOfTriangle[typeOfTriangle];
  return drawTriangle(heightOfTriangle);
}

const generateFilledDiamond = function (height) {
  let result = [];
  for (let rowLength=1; rowLength<height; rowLength+=2) {
    result.push(alignCentre(repeatString('*',rowLength),height));
  }
  for (let rowLength=height; rowLength>=1; rowLength-=2) {
    result.push(alignCentre(repeatString('*',rowLength),height));
  }
  return result;
}

const generateHollowDiamond = function (height) {
  let result = [];
  for (let rowLength=1; rowLength<height; rowLength+=2) {
    result.push(alignCentre(generateLine(rowLength,'*',' ','*'),height));
  }
  for (let rowLength=height; rowLength>=1; rowLength-=2) {
    result.push(alignCentre(generateLine(rowLength,'*',' ','*'),height));
  }
  return result;
}

const generateAngledDiamond = function (height) {
  let result = [alignCentre(repeatString("*",1),height)];
  for (let rowLength=3; rowLength<height; rowLength+=2) {
    result.push(alignCentre(generateLine(rowLength,'/',' ','\\'),height));
  }
  if (height > 1) {
    result.push(generateLine(height,'*',' ','*'));
  }
  for (let rowLength=height-2; rowLength>1; rowLength-=2) {
    result.push(alignCentre(generateLine(rowLength,'\\',' ','/'),height));
  }
  if(height > 1) {
    result.push(alignCentre(repeatString("*",1),height));
  }
  return result;
}

typesOfDiamond = {"filled" :generateFilledDiamond, 
                  "filled_diamond": generateFilledDiamond,
                  "hollow" :generateHollowDiamond, 
                  "hollow_diamond": generateHollowDiamond,
                  "angled":generateAngledDiamond,
                  "angled_diamond": generateAngledDiamond}

const generateDiamond = function (parameters) {
  let heightOfDiamond = parameters.height;
  let typeOfDiamond = parameters.type;
  let drawDiamond = typesOfDiamond[typeOfDiamond]; 
  let height = heightOfDiamond;
  if (heightOfDiamond % 2 == 0) {
    height = heightOfDiamond + 1;
  }
  return drawDiamond(height);
}

const generateFlipedPattern = function (source) {
  let result = [];
  for (let element of source) {
    element = element.split("").reverse().join("");
    result.push(element);
  }
  return result;
}

const generateMirrorPattern = function (source) {
  return source.reverse();
}

const typesOfPatterns = {'filled_rectangle':generateRectangle,
                  'empty_rectangle':generateRectangle,
                  'alternating_rectangle':generateRectangle,
                  'right_triangle':generateTriangle,
                  'left_triangle':generateTriangle,
                  'filled_diamond':generateDiamond,
                  'hollow_diamond':generateDiamond,
                  'angled_diamond':generateDiamond
};

const generatePattern = function (parameters) {
  let patterns = [];
  let printMode = parameters[0];
  for (let index=1; index<parameters.length; index++) {
    let pattern = typesOfPatterns[parameters[index]["type"]];
    let generatedPattern = pattern(parameters[index]);
    let patternToMerge = generatedPattern;
    if (printMode == "flip") {
      patternToMerge = generateFlipedPattern(generatedPattern);
    }
    if (printMode == 'mirror') {
      patternToMerge = generateMirrorPattern(generatedPattern);
    }  
    patterns.push(patternToMerge);
  }
  let mergedPattern = [];
  patterns = patterns.reverse();
  patterns = patterns.reduce(zipArray);
  if (parameters.length == 2) {
    return patterns;
  }
  for (let line of patterns) {
    line = line.join(" ");
    mergedPattern.push(line);
  }
  return mergedPattern;
}

exports.generatePattern = generatePattern;
exports.generateDiamond = generateDiamond;
exports.generateTriangle = generateTriangle;
exports.generateRectangle = generateRectangle;
