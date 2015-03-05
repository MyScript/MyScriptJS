'use strict';

var utils = require('../utils/testUtils.js');

function processMath(host, applicationKey, resultTypes, hmacKey, inputFileName) {
    
    //var host = 'cloud-internal-master.visionobjects.com';
    //var applicationKey = '7850ae71-6073-469c-8b8e-8abc8be44662';
    //var hmacKey = '7bc38c71-c867-c713-a7cd-6605a54141da';
    var mathRecognizer = new MyScript.MathRecognizer(host),
        parameters = new MyScript.MathParameter(),
        instanceId;

    var components = utils.generateInputComponents(inputFileName);
    
    if ( resultTypes === "latex"){
        parameters.setResultTypes(['LATEX']);
    }
    else if ( resultTypes === "mathml"){
        parameters.setResultTypes(['MATHML']);
    }
    else if ( resultTypes === "symboltree"){
        parameters.setResultTypes(['SYMBOLTREE']);
    }
    else if ( resultTypes === "latex&ml"){
        parameters.setResultTypes(['MATHML','LATEX']);
    }
    else {
        parameters.setResultTypes(['LATEX']);
    }

    describe('MathRecognizer Do SimpleRecognition', function() {
        it('checking MathRecognizer exists', function() {
            expect(mathRecognizer).to.exist;
        });
        it('checking MathRecognizer not null', function() {
            expect(mathRecognizer).not.to.be.null;
        });
        var response = '';
        var failed = false;
        
        it('do reco', function(done) {
            mathRecognizer.doSimpleRecognition(applicationKey, instanceId, components, hmacKey, parameters).then(
                function success(data) {
                    response = data;
                    done();
                },
                function failure(error) {
                    failed = true;
                    response = error;
                    done();
                }
            );
        });
        if (!failed)
        {
            it('success response is instance of MathResult', function () {
                expect(response).instanceof(MyScript.MathResult);
            });
            it('success response not undefined', function () {
                expect(response.getInstanceId()).not.to.be.undefined;
            });
            it('success response exists', function () {
                expect(response.getMathDocument()).to.exist;
            });
            it('success response not null', function() {
                expect(response.getMathDocument()).not.to.be.null;
            });
            it('success response mathDocument is not undefined', function () {
                expect(response.getMathDocument()).not.to.be.undefined;
            });
            var results;
            it('test', function() {
                results = response.getMathDocument().getResultElements();
                expect(results.length).to.be.above(0);
            });
            it('checking latex elements', function(){
                for (var i =0; i<results.length; i++) {
                    if ( resultTypes === "latex"){
                        expect(results[i]).instanceof(MyScript.MathLaTexResultElement);
                        console.log(results[i].getValue()); //check value here
                    }
                    else if ( resultTypes === "mathml"){
                        expect(results[i]).instanceof(MyScript.MathMathMLResultElement);
                        console.log(results[i].getValue()); //check value here
                    }
                    else if ( resultTypes === "symboltree"){
                        expect(results[i]).instanceof(MyScript.MathSymbolTreeResultElement);
                        console.log(results[i].getValue()); //check value here
                    }
                    else if ( resultTypes === "latex&ml"){
                        if(results[i].getType()==='LATEX') {
                            expect(results[i]).instanceof(MyScript.MathLatexResultElement);
                            console.log(results[i].getValue()); //check value here
                        }
                        else if(results[i].getType()==='MATHML') {
                            expect(results[i]).instanceof(MyScript.MathMathMLResultElement);
                            console.log(results[i].getValue()); //check value here
                        }
                    }
                    else {
                            expect(results[i]).instanceof(MyScript.MathLatexResultElement);
                            console.log(results[i].getValue()); //check value here
                    }
                }
            });
        }
        else
        {
            it('failure response not undefined', function () {
                expect(response).not.to.be.undefined;
            });
            it('failure response exists', function () {
                expect(response).to.exist;
            });
            it('failure response not null', function() {
                expect(response).not.to.be.null;
            });
            it('failure reponse not empty', function() {
                expect(response).not.to.be.equal('');
            });
            
        }
    });
}

processMath('cloud-internal-master.visionobjects.com', "7850ae71-6073-469c-8b8e-8abc8be44662", "latex", "7bc38c71-c867-c713-a7cd-6605a54141da", "../in/inkfiles/math/result/cosh.ink");

