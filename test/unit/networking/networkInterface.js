'use strict';

describe('NetworkInterface: input/networking/networkInterface.js', function () {

    describe('Default construction', function () {

        var networkInterface;
        before(function (done) {
            networkInterface = new MyScript.NetworkInterface();
            done();
        });

        it('check initial state', function () {
            expect(networkInterface).to.be.an('object');
            expect(networkInterface).to.be.an.instanceof(MyScript.NetworkInterface);
        });

    });

    var req = {
        responseText: {
            'result': {
                'segments': [{
                    'elementType': 'shape',
                    'selectedCandidateIndex': 0,
                    'candidates': [{
                        'type': 'recognizedShape',
                        'label': 'polyline',
                        'primitives': [{
                            'type': 'line',
                            'firstPoint': {'x': 462.22437, 'y': 264.97427},
                            'lastPoint': {'x': 462.22437, 'y': 522.2577},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 462.22437, 'y': 522.2577},
                            'lastPoint': {'x': 719.6487, 'y': 522.2577},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 719.6487, 'y': 522.2577},
                            'lastPoint': {'x': 738.98096, 'y': 337.83484},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 738.98096, 'y': 337.83484},
                            'lastPoint': {'x': 309.15405, 'y': 337.83484},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }],
                        'normalizedRecognitionScore': 0.6662962,
                        'resemblanceScore': 0.8575315
                    }, {
                        'type': 'recognizedShape',
                        'label': 'rectangle',
                        'primitives': [{
                            'type': 'line',
                            'firstPoint': {'x': 457.2292, 'y': 342.71014},
                            'lastPoint': {'x': 468.7834, 'y': 530.19183},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 468.7834, 'y': 530.19183},
                            'lastPoint': {'x': 735.3832, 'y': 513.76166},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 735.3832, 'y': 513.76166},
                            'lastPoint': {'x': 723.829, 'y': 326.28},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 723.829, 'y': 326.28},
                            'lastPoint': {'x': 457.2292, 'y': 342.71014},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }],
                        'normalizedRecognitionScore': 0.0742478,
                        'resemblanceScore': 0.062050514
                    }, {
                        'type': 'recognizedShape',
                        'label': 'parallelogram',
                        'primitives': [{
                            'type': 'line',
                            'firstPoint': {'x': 466.6958, 'y': 348.53168},
                            'lastPoint': {'x': 460.10315, 'y': 537.1317},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 460.10315, 'y': 537.1317},
                            'lastPoint': {'x': 725.9165, 'y': 507.94012},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 725.9165, 'y': 507.94012},
                            'lastPoint': {'x': 732.50916, 'y': 319.3401},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 732.50916, 'y': 319.3401},
                            'lastPoint': {'x': 466.6958, 'y': 348.53168},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }],
                        'normalizedRecognitionScore': 0.07328355,
                        'resemblanceScore': 0.062050514
                    }, {
                        'type': 'recognizedShape',
                        'label': 'trapezoid',
                        'primitives': [{
                            'type': 'line',
                            'firstPoint': {'x': 465.44275, 'y': 536.5458},
                            'lastPoint': {'x': 720.57684, 'y': 508.52612},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 720.57684, 'y': 508.52612},
                            'lastPoint': {'x': 738.3324, 'y': 318.70016},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 738.3324, 'y': 318.70016},
                            'lastPoint': {'x': 460.8725, 'y': 349.17166},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 460.8725, 'y': 349.17166},
                            'lastPoint': {'x': 465.44275, 'y': 536.5458},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }],
                        'normalizedRecognitionScore': 0.072801374,
                        'resemblanceScore': 0.062050514
                    }, {
                        'type': 'recognizedShape',
                        'label': 'quadrilateral',
                        'primitives': [{
                            'type': 'line',
                            'firstPoint': {'x': 460.2239, 'y': 341.1303},
                            'lastPoint': {'x': 466.575, 'y': 544.53314},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 466.575, 'y': 544.53314},
                            'lastPoint': {'x': 719.4446, 'y': 500.53876},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 719.4446, 'y': 500.53876},
                            'lastPoint': {'x': 738.98096, 'y': 326.74152},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 738.98096, 'y': 326.74152},
                            'lastPoint': {'x': 460.2239, 'y': 341.1303},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }],
                        'normalizedRecognitionScore': 0.07231927,
                        'resemblanceScore': 0.062050514
                    }, {
                        'type': 'recognizedShape',
                        'label': 'square',
                        'primitives': [{
                            'type': 'line',
                            'firstPoint': {'x': 475.25208, 'y': 318.67783},
                            'lastPoint': {'x': 486.74805, 'y': 549.29},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 486.74805, 'y': 549.29},
                            'lastPoint': {'x': 717.3602, 'y': 537.79407},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 717.3602, 'y': 537.79407},
                            'lastPoint': {'x': 705.86426, 'y': 307.18182},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 705.86426, 'y': 307.18182},
                            'lastPoint': {'x': 475.25208, 'y': 318.67783},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }],
                        'normalizedRecognitionScore': 0.023420418,
                        'resemblanceScore': 0.019446678
                    }, {
                        'type': 'recognizedShape',
                        'label': 'rhombus',
                        'primitives': [{
                            'type': 'line',
                            'firstPoint': {'x': 483.49197, 'y': 326.1352},
                            'lastPoint': {'x': 479.29068, 'y': 557.52985},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 479.29068, 'y': 557.52985},
                            'lastPoint': {'x': 709.12036, 'y': 530.3367},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 709.12036, 'y': 530.3367},
                            'lastPoint': {'x': 713.32166, 'y': 298.94196},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }, {
                            'type': 'line',
                            'firstPoint': {'x': 713.32166, 'y': 298.94196},
                            'lastPoint': {'x': 483.49197, 'y': 326.1352},
                            'beginDecoration': 'NONE',
                            'endDecoration': 'NONE',
                            'beginTangentAngle': 0.0,
                            'endTangentAngle': 0.0
                        }],
                        'normalizedRecognitionScore': 0.01763138,
                        'resemblanceScore': 0.014831247
                    }],
                    'inkRanges': [{'firstStroke': 0, 'lastStroke': 0, 'firstPoint': 0.0, 'lastPoint': 68.0}],
                    'uniqueID': ''
                }]
            },
            'instanceId': 'b5311405-f05d-46e9-b1e5-dce3eb06c7a6'
        }
    };
    it('NetworkInterface Parse', function () {
        expect(MyScript.NetworkInterface.parse(req)).to.deep.equal(req.responseText);
    });

    var data = new MyScript.ShapeRecognitionData();
    data.setApplicationKey('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    data.setShapeRecognitionInput({
        'components': [{
            'type': 'stroke',
            'x': [435, 437, 438, 443, 454, 473, 500, 531, 566, 601, 640, 681, 720, 759, 794, 819, 844, 863, 878, 889, 898, 905, 908, 909, 910, 909, 908, 907, 906, 905, 903, 901, 898, 895, 892, 890, 889, 888, 888, 890, 891, 892, 894, 897, 901, 906, 910, 914, 918, 919, 920, 922, 923, 923, 924, 924, 923, 920, 916, 911, 907, 905, 903, 901, 900, 898, 898, 898],
            'y': [384, 384, 384, 384, 384, 384, 386, 389, 392, 395, 400, 405, 410, 415, 420, 425, 427, 430, 432, 432, 432, 432, 432, 432, 432, 430, 428, 425, 422, 419, 416, 412, 407, 401, 397, 393, 390, 389, 390, 390, 390, 391, 393, 397, 402, 407, 411, 415, 419, 423, 424, 425, 426, 427, 427, 428, 432, 438, 447, 458, 464, 470, 475, 481, 485, 489, 490, 491]
        }],
        'doBeautification': true,
        'rejectDetectionSensitivity': 0
    });
    data.setInstanceId('117cd079-e816-4780-b533-fa7411df3b22');
    data.setHmac('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
});