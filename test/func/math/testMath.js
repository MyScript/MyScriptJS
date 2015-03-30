'use strict';

/**
 * generateComponents by parsing ink file *
 * @method parseInkFile
 * @param {String} path of the file
 * @returns strokes of the ink file
 */
var generateInputComponents = function (data) {
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

    //Open ink file and read line by line
    function processLine(line) {
        //get first line: stroke number
        //console.log('line = ' + line);
        if (myLoop === 0) {
            //stroke number
            strokeNumber = parseInt(line, 10);
            //console.log('strokeNb: ' + strokeNumber);
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
            //console.log('pointNumber: ' + pointNumber);
            startStroke = true;
            myLoop += 1;
        }
        else if (startStroke === true) {
            //get match regex
            var m = line.match(header_rgx);
            //Fill strokeValue List
            if (m !== undefined && m !== null) {
                var space = ' ';
                //console.log('m[0]: ' + m[0]);
                var XY = m[0].split(space);
                x = parseFloat(XY[0]);
                y = parseFloat(XY[1]);
                if (newStroke) {
                    //console.log('new stroke: x= ' + x + ' y=' + y);
                    inkManager.startInkCapture(x, y);
                    newStroke = false;
                }
                else {
                    //console.log('continue stroke: x= ' + x + ' y=' + y);
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
                //console.log('pointNumber: ' + pointNumber);
                //clean endPoint variable
                endPoint = -1;
            }
            //incr point
            endPoint += 1;
        }

    }

    var lines = data.split('\n');
    for(var i = 0;i < lines.length;i++){
        processLine(lines[i]);
    }
    return inputComponents;
};

var getMathAllNodes = function(node, myNodeVector)
{
    console.log('getMathAllNodes start with MyNodeVector length = ' + myNodeVector.length + ' node Type = ' + node.getType() + ' node Name = ' + node.getName());
    //select new node
    if (node.getType() === 'nonTerminalNode') {
        console.log('nonTerminalNode');
        // Retrieve the selected candidate
        var index = node.getSelectedCandidateIdx();
        console.log('selected Idx = ' + index);
        var selectedCandidate = node.getSelectedCandidate();
        expect(selectedCandidate).to.equal(node.getCandidates()[index]);
        console.log('selectedCandidate name: ' + selectedCandidate.getName() + ' selectedCandidate type: ' + selectedCandidate.getType());
        myNodeVector.push(selectedCandidate);
        console.log('MyNodeVector new length = ' + myNodeVector.length);
        getMathAllNodes(selectedCandidate, myNodeVector);
    }
    else if (node.getType() === 'rule'){
        console.log('mathRuleNode');
        var childCount = node.getChildren().length;

        for ( var chC=0; chC < childCount; chC++)
        {
            var child = node.getChildren()[chC];
            console.log('child name: ' + child.getName() + 'child type: ' + child.getType());
            myNodeVector.push(child);
            getMathAllNodes(child, myNodeVector);
        }
    }
    else if ( node.getType() === 'terminalNode') {
        console.log('node name: ' + node.getName() + 'node type: ' + node.getType());
    }
    return true;
};



function processMath(host, applicationKey, hmacKey, resultTypes, inputData, LxExpectedResult, MathMlExpectedResult) {

    //var host = 'cloud-internal-stable.visionobjects.com';
    //var applicationKey = '7850ae71-6073-469c-8b8e-8abc8be44662';
    //var hmacKey = '7bc38c71-c867-c713-a7cd-6605a54141da';
    var mathRecognizer = new MyScript.MathRecognizer(host),
        parameters = new MyScript.MathParameter(),
        instanceId;

    var components = generateInputComponents(inputData);

    if (resultTypes === 'latex') {
        parameters.setResultTypes(['LATEX']);
    }
    else if (resultTypes === 'mathml') {
        parameters.setResultTypes(['MATHML']);
    }
    else if (resultTypes === 'symboltree') {
        parameters.setResultTypes(['SYMBOLTREE']);
    }
    else if (resultTypes === 'latex&ml') {
        parameters.setResultTypes(['MATHML', 'LATEX']);
    }
    else {
        parameters.setResultTypes(['LATEX']);
    }

    describe('MathRecognizer Do SimpleRecognition', function () {
        it('checking MathRecognizer exists', function () {
            expect(mathRecognizer).to.exist;
        });
        it('checking MathRecognizer not null', function () {
            expect(mathRecognizer).not.to.be.null;
        });
        var response = '';
        var failed = false;

        it('do reco', function (done) {
            mathRecognizer.doSimpleRecognition(applicationKey, instanceId, components, hmacKey, parameters).then(
                function success(data) {
                    console.log('success');
                    response = data;
                    done();
                },
                function failure(error) {
                    console.log('failure: ' + error);
                    failed = true;
                    response = error;
                    done();
                }
            );
        });
        if (!failed) {
            it('success response is instance of MathResult', function () {
                expect(response).instanceof(MyScript.MathResult);
            });
            it('success response not undefined', function () {
                expect(response.getInstanceId()).not.to.be.undefined;
            });
            it('success response exists', function () {
                expect(response.getMathDocument()).to.exist;
            });
            it('success response not null', function () {
                expect(response.getMathDocument()).not.to.be.null;
            });
            it('success response mathDocument is not undefined', function () {
                expect(response.getMathDocument()).not.to.be.undefined;
            });
            var results;
            it('test', function () {
                results = response.getMathDocument().getResultElements();
                expect(results.length).to.be.above(0);
                console.log('results length: ' + results.length);
            });
            it('checking elements', function () {
                for (var i = 0; i < results.length; i++) {
                    if (resultTypes === 'latex') {
                        expect(results[i]).instanceof(MyScript.MathLaTexResultElement);
                        console.log('Latex result: ' + results[i].getValue()); //check value here
                        expect(results[i].getValue()).to.equal(LxExpectedResult);
                    }
                    else if (resultTypes === 'mathml') {
                        expect(results[i]).instanceof(MyScript.MathMathMLResultElement);
                        console.log('mathML result: ' + results[i].getValue()); //check value here
                        expect(results[i].getValue()).to.equal(MathMlExpectedResult);
                    }
                    else if (resultTypes === 'symboltree') {
                        expect(results[i]).instanceof(MyScript.MathSymbolTreeResultElement);
                        var mathNode = results[i].getRoot();
                        var myNodes = [];
                        getMathAllNodes(mathNode, myNodes);
                        console.log('Nodes length = ' + myNodes.length);
                        for( var j = 0; j<myNodes.length; j++) {
                            console.log('NodeType = ' + myNodes[j].getType() + ' NodeName = ' + myNodes[j].getName());
                            if(myNodes[j].getType() === 'nonTerminalNode') {
                                if (myNodes[j].getName() === 'exponentiable') {
                                    expect(myNodes[j]).to.be.an.instanceOf(MyScript.MathExponentiableNonTerminalNode);
                                }
                                else if (myNodes[j].getName() === 'expression') {
                                    expect(myNodes[j]).to.be.an.instanceOf(MyScript.MathExpressionNonTerminalNode);
                                }
                            }
                            else if(myNodes[j].getType() === 'rule') {
                                if (myNodes[j].getName() === 'fence') {
                                    expect(myNodes[j]).to.be.an.instanceOf(MyScript.MathFenceRuleNode);
                                }
                            }
                        }
                    }
                    else if (resultTypes === 'latex&ml') {
                        if (results[i].getType() === 'LATEX') {
                            expect(results[i]).instanceof(MyScript.MathLaTexResultElement);
                            console.log('Latex result: ' + results[i].getValue()); //check value here
                            expect(results[i].getValue()).to.equal(LxExpectedResult);
                        }
                        else if (results[i].getType() === 'MATHML') {
                            expect(results[i]).instanceof(MyScript.MathMathMLResultElement);
                            console.log('mathML result: ' + results[i].getValue()); //check value here
                            expect(results[i].getValue()).to.equal(MathMlExpectedResult);
                        }
                    }
                    else {
                        expect(results[i]).instanceof(MyScript.MathLaTexResultElement);
                        console.log('Latex result: ' + results[i].getValue()); //check value here
                        expect(results[i].getValue()).to.equal(LxExpectedResult);
                    }
                }
            });
        }
        else {
            it('failure response not undefined', function () {
                expect(response).not.to.be.undefined;
            });
            it('failure response exists', function () {
                expect(response).to.exist;
            });
            it('failure response not null', function () {
                expect(response).not.to.be.null;
            });
            it('failure reponse not empty', function () {
                expect(response).not.to.be.equal('');
            });

        }
    });
}

var nroot1 = '5\n84\n311 336\n313 341\n318 352\n322 360\n327 367\n330 376\n333 384\n338 396\n342 406\n345 416\n350 427\n356 438\n360 449\n365 459\n368 469\n371 478\n375 482\n376 484\n376 485\n379 478\n384 460\n391 442\n397 420\n399 404\n405 382\n408 361\n409 344\n409 330\n409 316\n409 303\n407 292\n404 281\n401 269\n399 261\n396 252\n394 244\n391 237\n387 229\n387 225\n385 219\n383 214\n382 210\n381 205\n380 202\n380 200\n379 198\n379 196\n380 195\n387 194\n396 194\n407 193\n420 192\n435 191\n454 190\n477 188\n500 187\n528 185\n552 182\n575 181\n593 178\n609 176\n619 175\n628 174\n634 172\n639 171\n644 170\n649 168\n652 167\n655 166\n658 166\n660 165\n660 164\n661 165\n664 175\n668 184\n670 191\n672 197\n673 204\n675 210\n676 216\n676 221\n676 227\n677 231\n677 232\n33\n257 147\n257 150\n256 161\n254 170\n252 176\n249 183\n247 189\n244 195\n242 200\n241 206\n240 210\n239 211\n239 213\n239 214\n239 215\n240 215\n241 216\n242 216\n244 217\n247 217\n250 218\n253 218\n257 218\n261 218\n264 218\n268 217\n269 216\n271 214\n272 214\n272 213\n272 212\n272 211\n271 211\n16\n271 197\n270 203\n270 207\n270 211\n270 217\n270 222\n270 227\n270 231\n270 235\n270 237\n270 240\n270 243\n271 245\n271 246\n272 248\n272 249\n62\n466 319\n466 318\n466 317\n466 315\n466 314\n467 313\n468 312\n470 311\n471 311\n472 312\n475 317\n478 324\n479 331\n480 339\n480 347\n480 356\n480 366\n478 376\n473 386\n469 396\n463 405\n457 413\n449 422\n440 430\n431 436\n422 441\n412 447\n401 453\n392 456\n386 459\n382 460\n380 460\n380 461\n381 461\n383 461\n387 459\n390 459\n395 458\n400 458\n406 458\n411 458\n417 460\n422 462\n427 465\n431 467\n436 469\n442 473\n448 476\n456 479\n463 481\n471 482\n479 482\n486 482\n493 482\n499 482\n504 482\n509 482\n512 482\n514 481\n516 480\n517 480\n518 480\n102\n561 415\n564 415\n567 415\n571 415\n576 418\n580 420\n582 426\n584 432\n585 438\n585 443\n585 450\n585 456\n583 462\n581 466\n580 470\n579 472\n578 473\n577 473\n576 474\n575 474\n575 475\n574 475\n573 475\n572 475\n572 474\n572 472\n573 469\n575 465\n577 459\n580 452\n584 443\n588 435\n591 427\n595 421\n599 415\n601 412\n603 409\n605 407\n605 406\n606 406\n607 406\n608 406\n610 406\n612 406\n614 406\n616 406\n619 406\n620 407\n621 407\n622 407\n621 407\n620 407\n618 407\n615 407\n613 407\n610 407\n608 407\n605 408\n602 408\n599 409\n598 409\n597 409\n596 410\n595 411\n594 413\n592 416\n590 422\n589 428\n588 433\n588 438\n587 445\n587 450\n587 455\n588 459\n591 463\n593 466\n595 470\n597 472\n599 473\n601 475\n604 476\n607 478\n610 479\n615 481\n621 482\n628 483\n633 485\n639 485\n646 485\n651 485\n655 485\n658 484\n658 483\n659 480\n660 479\n660 477\n660 475\n660 472\n660 470\n660 468\n660 467\n660 465\n';
var nroot1Lx = '\\sqrt [4] {2x}';
var nroot1Ml = '<math xmlns="http://www.w3.org/1998/Math/MathML">\n  <mstyle displaystyle="true">\n    <mroot>\n      <mrow>\n        <mn> 2 </mn>\n        <mi> x </mi>\n      </mrow>\n      <mrow>\n        <mn> 4 </mn>\n      </mrow>\n    </mroot>\n  </mstyle>\n</math>';

var logcur1 = '9\n105\n412 344\n420 341\n424 338\n432 327\n440 311\n444 302\n447 293\n449 284\n450 275\n451 267\n451 259\n451 253\n450 248\n449 243\n448 239\n446 236\n444 233\n443 231\n441 229\n439 228\n438 227\n436 227\n434 227\n432 228\n430 231\n427 234\n425 238\n422 243\n420 249\n418 255\n416 262\n414 269\n413 275\n412 282\n412 289\n411 297\n411 304\n411 312\n412 319\n413 326\n414 333\n415 340\n416 347\n417 353\n417 358\n418 364\n419 370\n419 375\n420 380\n420 385\n420 389\n421 393\n421 396\n422 399\n422 401\n423 403\n424 405\n425 406\n427 408\n428 409\n430 409\n432 411\n433 411\n435 412\n437 413\n438 413\n440 413\n441 413\n442 414\n443 414\n444 414\n445 414\n446 414\n447 414\n448 414\n450 414\n452 413\n454 413\n456 412\n458 411\n459 410\n461 409\n463 407\n465 405\n466 403\n468 401\n469 399\n470 398\n471 396\n472 395\n472 394\n473 393\n473 392\n473 391\n474 391\n474 390\n474 389\n474 388\n475 387\n476 386\n477 384\n478 382\n479 380\n481 377\n483 373\n121\n494 353\n492 349\n487 348\n485 349\n476 363\n472 374\n471 379\n470 385\n470 390\n470 395\n472 399\n475 403\n478 406\n482 408\n486 409\n491 410\n495 410\n499 410\n503 408\n506 405\n509 402\n511 398\n513 394\n515 390\n516 385\n516 380\n516 375\n516 371\n516 366\n515 362\n513 358\n511 355\n509 352\n507 350\n504 348\n502 346\n499 345\n497 344\n495 344\n492 344\n490 344\n488 346\n486 347\n485 349\n484 351\n484 353\n484 355\n485 357\n488 358\n491 359\n495 360\n500 361\n505 361\n510 362\n514 362\n519 362\n523 362\n527 362\n530 362\n533 361\n536 361\n537 361\n539 360\n540 360\n540 359\n540 358\n541 357\n542 357\n543 357\n545 356\n546 355\n547 355\n548 354\n549 353\n549 352\n548 352\n546 353\n544 356\n542 360\n541 364\n539 369\n539 374\n538 379\n538 384\n540 389\n542 393\n544 396\n547 398\n551 399\n554 400\n559 400\n562 399\n566 397\n569 393\n572 389\n575 385\n576 379\n578 374\n578 368\n578 364\n577 360\n575 356\n572 353\n569 351\n566 350\n563 350\n561 350\n559 350\n557 352\n556 353\n556 355\n556 357\n556 359\n557 360\n559 361\n561 362\n563 362\n566 362\n568 362\n569 362\n571 361\n46\n571 361\n574 361\n578 374\n583 387\n589 404\n592 414\n595 425\n597 436\n599 447\n601 459\n602 470\n603 480\n603 489\n603 496\n602 502\n600 507\n597 511\n594 513\n592 515\n589 516\n587 516\n585 516\n583 514\n582 510\n582 506\n582 500\n582 493\n582 486\n584 478\n585 471\n587 465\n590 459\n592 455\n595 451\n598 449\n602 448\n604 448\n607 448\n610 448\n611 448\n612 448\n613 448\n613 447\n613 446\n611 444\n610 441\n29\n656 234\n648 242\n640 255\n637 264\n633 275\n631 288\n630 301\n630 315\n631 329\n633 344\n636 357\n640 369\n643 380\n646 389\n649 397\n652 403\n654 407\n656 410\n657 412\n658 413\n659 413\n660 413\n660 412\n660 410\n660 407\n658 404\n656 400\n654 396\n652 391\n61\n720 272\n717 270\n719 268\n728 267\n736 269\n740 272\n743 277\n745 283\n746 290\n746 299\n744 309\n741 319\n736 329\n731 339\n725 349\n719 357\n713 365\n707 372\n702 377\n698 382\n694 385\n691 388\n689 389\n687 390\n686 390\n685 389\n685 386\n685 384\n685 381\n685 378\n686 376\n687 374\n689 374\n690 374\n692 375\n695 378\n697 382\n701 386\n705 390\n709 394\n713 398\n718 402\n722 405\n727 406\n731 408\n736 408\n739 408\n743 408\n746 406\n748 404\n750 402\n751 401\n752 399\n753 398\n753 397\n753 396\n753 395\n752 395\n750 394\n749 393\n749 392\n21\n829 312\n832 310\n829 342\n823 358\n819 365\n816 372\n813 379\n811 384\n809 389\n807 393\n806 396\n805 398\n805 399\n805 400\n806 400\n807 400\n809 399\n812 397\n815 394\n818 391\n821 388\n24\n861 343\n864 332\n861 344\n859 357\n857 364\n857 371\n856 378\n856 385\n856 391\n856 396\n856 400\n857 404\n858 407\n859 409\n859 411\n860 412\n861 412\n862 412\n863 412\n863 410\n863 408\n863 404\n863 400\n862 395\n41\n820 301\n817 302\n816 303\n815 304\n816 304\n822 302\n829 301\n834 301\n837 301\n841 302\n844 304\n846 307\n848 311\n849 316\n850 321\n851 326\n852 331\n852 336\n854 341\n855 345\n857 349\n859 351\n861 353\n864 354\n867 355\n870 355\n873 355\n876 354\n879 353\n882 352\n884 350\n886 348\n888 346\n889 345\n890 343\n890 342\n890 340\n890 339\n891 337\n891 335\n891 333\n31\n906 230\n905 230\n908 233\n912 241\n917 253\n920 261\n922 271\n924 281\n925 293\n925 306\n925 320\n924 333\n922 347\n920 360\n917 372\n914 384\n912 394\n910 403\n907 410\n906 416\n904 421\n903 425\n902 428\n901 430\n901 431\n902 431\n904 431\n905 429\n907 427\n909 425\n911 422\n';
var logcur1Lx = '\\log \\left( 2\\pi \\right) ';
var logcur1Ml = '<math xmlns="http://www.w3.org/1998/Math/MathML">\n  <mstyle displaystyle="true">\n    <mi> log </mi>\n    <mfenced>\n      <mrow>\n        <mn> 2 </mn>\n        <mi> &#x03C0;<!--greek small letter pi--> </mi>\n      </mrow>\n    </mfenced>\n  </mstyle>\n</math>';

processMath('cloud-internal-stable.visionobjects.com', '7850ae71-6073-469c-8b8e-8abc8be44662', '7bc38c71-c867-c713-a7cd-6605a54141da', 'latex', nroot1, nroot1Lx, nroot1Ml);
processMath('cloud-internal-stable.visionobjects.com', '7850ae71-6073-469c-8b8e-8abc8be44662', '7bc38c71-c867-c713-a7cd-6605a54141da', 'mathml', nroot1, nroot1Lx, nroot1Ml);
processMath('cloud-internal-stable.visionobjects.com', '7850ae71-6073-469c-8b8e-8abc8be44662', '7bc38c71-c867-c713-a7cd-6605a54141da', 'latex&ml', nroot1, nroot1Lx, nroot1Ml);
processMath('cloud-internal-stable.visionobjects.com', '7850ae71-6073-469c-8b8e-8abc8be44662', '7bc38c71-c867-c713-a7cd-6605a54141da', '', nroot1, nroot1Lx, nroot1Ml);
processMath('cloud-internal-stable.visionobjects.com', '7850ae71-6073-469c-8b8e-8abc8be44662', '7bc38c71-c867-c713-a7cd-6605a54141da', 'symboltree', nroot1, nroot1Lx, nroot1Ml);

processMath('cloud-internal-stable.visionobjects.com', '7850ae71-6073-469c-8b8e-8abc8be44662', '7bc38c71-c867-c713-a7cd-6605a54141da', 'latex', logcur1, logcur1Lx, logcur1Ml);
processMath('cloud-internal-stable.visionobjects.com', '7850ae71-6073-469c-8b8e-8abc8be44662', '7bc38c71-c867-c713-a7cd-6605a54141da', 'mathml', logcur1, logcur1Lx, logcur1Ml);
processMath('cloud-internal-stable.visionobjects.com', '7850ae71-6073-469c-8b8e-8abc8be44662', '7bc38c71-c867-c713-a7cd-6605a54141da', 'latex&ml', logcur1, logcur1Lx, logcur1Ml);
processMath('cloud-internal-stable.visionobjects.com', '7850ae71-6073-469c-8b8e-8abc8be44662', '7bc38c71-c867-c713-a7cd-6605a54141da', '', logcur1, logcur1Lx, logcur1Ml);
processMath('cloud-internal-stable.visionobjects.com', '7850ae71-6073-469c-8b8e-8abc8be44662', '7bc38c71-c867-c713-a7cd-6605a54141da', 'symboltree', logcur1, logcur1Lx, logcur1Ml);

