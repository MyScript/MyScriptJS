'use strict';
var exports = module.exports = {};

/**
 * open a file
 *
 * @method openFile
 * @param {String} name of the file
 * @returns content of the file
 */
function openFile(fileName) {
    var fs = require('fs');

    fs.readFile(fileName, function (err, data) {
        if (err) {
            throw err;
        }
        return data;
    });
}


/**
 * obtain the precision of a number
 *
 * @method getPrecision
 * @param {String} string to analyse
 * @param {String} separator
 * @returns the precision of the number represented by myString
 */
function getPrecision(myString, separator) {
    var myPrecision;
    try {
        //Split string
        myPrecision = (myString.split(separator)[1]).length;
    }
    catch (err) {
        //No precision
        myPrecision = 0;
    }
    return myPrecision;
}


function readLines(input, callback) {
    var remaining = '';

    input.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            callback(line);
            index = remaining.indexOf('\n');
        }
    });

    input.on('end', function () {
        if (remaining.length > 0) {
            callback(remaining);
        }
    });
}


/**
 * generateComponents by parsing ink file *
 * @method parseInkFile
 * @param {String} path of the file
 * @returns strokes of the ink file
 */
exports.generateInputComponents = function (myFilePath) {
    var fs = require('fs');
    var x = [],
        y = [],
        myLoop = 0,
        startStroke = false,
        strokeNumber = 0,
        newStroke = true,
        pointNumber = 0,
        endPoint = 0,
        inkManager = new MyScript.InkManager(),
        inputComponents = [];


    //define matcher regex
    var header_rgx = new RegExp('(.*) (.*)');

    var input = fs.createReadStream(myFilePath);

    //Open ink file and read line by line
    function processLine(line) {
        //get first line: stroke number
        if (myLoop === 0) {
            //stroke number
            strokeNumber = parseInt(line, 10);
            /*for (var i =0; i<strokeNumber; i++) {
             strokeValue.push({}); //create StrokeNumber dictionaries
             x.push([]);
             y.push([]);
             }*/
            //incr loop
            myLoop += 1;
        }
        else if (myLoop === 1) {
            //get first stroke: points number
            pointNumber = parseInt(line, 10);
            startStroke = true;
            myLoop += 1;
        }
        else if (startStroke === true) {
            //get match regex
            var m = header_rgx.match(line);
            //Fill strokeValue List
            if (m !== undefined && m !== '') {
                x = parseFloat(m.split(' ')[1]);
                y = parseFloat(m.split(' ')[2]);
                if (newStroke) {
                    inkManager.startInkCapture(x, y);
                    newStroke = false;
                }
                else {
                    inkManager.continueInkCapture(x, y);
                }
            }
            if (endPoint === pointNumber) {
                inkManager.endInkCapture();
                inputComponents.push(inkManager.getCurrentStroke());
                inkManager.clear();
                //define new stroke
                newStroke = true;
                //get new point number
                pointNumber = parseInt(line, 10);
                //clean endPoint variable
                endPoint = -1;
            }
            //incr point
            endPoint += 1;
        }

    }

    readLines(input, processLine);
    return inputComponents;
};
