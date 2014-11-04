(function (scope) {

    /**
     *
     * @class MathSolver
     * @constructor
     */
    function MathSolver () {
    }

    MathSolver.prototype.solve = function (expression){
        var exp = expression.replace('\\', '').replace('{', '(').replace('}', ')'), result;
        try {
            // Solve equation by detect = symbol on the expression
            if(exp.indexOf('=') > -1){
                var equationTree = exp.split('='),
                    leftMemberEq = equationTree[0],
                    rightMemberEq = equationTree[1];

                if(leftMemberEq.indexOf('+x') > -1){
                    result = 'x = ' + mathjs.eval(rightMemberEq + ' + (' + leftMemberEq.replace('+x','') + '*-1)');
                } else if(leftMemberEq.indexOf('-x') > -1){
                    result = 'x = ' + mathjs.eval('(' + rightMemberEq + ' - ' + leftMemberEq.replace('-x','') + ')*-1');
                }

                if(rightMemberEq.indexOf('+x') > -1){
                    result = 'x = ' + mathjs.eval(leftMemberEq + ' + (' + rightMemberEq.replace('+x','') + '*-1)');
                } else if(rightMemberEq.indexOf('-x') > -1){
                    result = 'x = ' + mathjs.eval('(' + leftMemberEq + ' - ' + rightMemberEq.replace('-x','') + ')*-1');
                }
            } else {
                result = ' = ' + mathjs.eval(exp);
            }
        } catch (err) {
            console.log(err);
        }

        return result;
    };

// Export
    scope.MathSolver = MathSolver;
})(MyScript);