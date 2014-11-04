(function (scope) {

    /**
     *
     * @class MathParser
     * @constructor
     */
    function MathParser () {
    }

    MathParser.prototype.format = function (root){
        var state = [];
        this.formatEquationNode(root, state);
        return state.join("");
    };

    MathParser.prototype.formatEquationNode = function (root, state){
        if (root.type === 'terminalNode') {
            this.formatEquationTerminalNode(root, state);
        } else if (root.type === 'nonTerminalNode') {
            this.formatEquationNonTerminalNode(root, state);
        } else if (root.type === 'rule') {
            this.formatEquationRuleNode(root, state);
        } else {
            throw new Error('unknown node type');
        }
    };

    MathParser.prototype.formatEquationTerminalNode = function (node, state){
        state.push(node.candidates[node.selectedCandidate].label);
    };

    MathParser.prototype.formatEquationNonTerminalNode = function (node, state){
        this.formatEquationNode(node.candidates[node.selectedCandidate], state);
   };

    MathParser.prototype.formatEquationRuleNode = function (node, state){
        var name = node.name;
        if (name === 'identity')
            this.formatIdentityRuleEquationRuleNode(node, state);
        else if (name === 'horizontal pair')
            this.formatHorizontalPairRuleEquationRuleNode(node, state);
        else if (name === 'fence')
            this.formatFenceRuleEquationRuleNode(node, state);
        else if (name === 'fraction')
            this.formatFractionRuleEquationRuleNode(node, state);
        else if (name === 'sqrt')
            this.formatSqrtRuleEquationRuleNode(node, state);
        else if (name === 'subscript')
            this.formatSubscriptRuleEquationRuleNode(node, state);
        else if (name === 'superscript')
            this.formatSuperscriptRuleEquationRuleNode(node, state);
        else if (name === 'subsuperscript')
            this.formatSubsuperscriptRuleEquationRuleNode(node, state);
        else if (name === 'underscript')
            this.formatUnderscriptRuleEquationRuleNode(node, state);
        else if (name === 'overscript')
            this.formatOverscriptRuleEquationRuleNode(node, state);
        else if (name === 'underoverscript')
            this.formatUnderoverscriptRuleEquationRuleNode(node, state);
        else if (name === 'presuperscript')
            this.formatPresuperscriptRuleEquationRuleNode(node, state);
        else if (name === 'vertical pair')
            this.formatVerticalPairRuleEquationRuleNode(node, state);
        else if (name === 'left fence')
            this.formatLeftFenceRuleEquationRuleNode(node, state);
        else
            throw new Error('unknown rule');
    };

    MathParser.prototype.formatIdentityRuleEquationRuleNode = function (node, state){
        this.formatEquationNode(node.children[0], state);
    };

    MathParser.prototype.formatHorizontalPairRuleEquationRuleNode= function (node, state){
        this.formatEquationNode(node.children[0], state);
        this.formatEquationNode(node.children[1], state);
    };

    MathParser.prototype.formatFenceRuleEquationRuleNode = function (node, state){
        // left symbol is the second child
        var str = node.children[1].candidates[node.children[1].selectedCandidate].label;

        if (str !== '('){
            state.push('(').push(str);
        } else {
            state.push(str);
        }

        var ruleNode = this.getChildRuleEquationNode(node.children[0], 'vertical pair');
        if (ruleNode !== null) {
            this.formatEquationNode(node.children[0], state);
        } else {
            this.formatEquationNode(node.children[0], state);
        }

        // right symbol is the third child
        str = node.children[2].candidates[node.children[2].selectedCandidate].label;

        if (str !== ')'){
            state.push(str).push(')');
        }else {
            state.push(str);
        }
    };

    MathParser.prototype.formatFractionRuleEquationRuleNode = function (node, state){

        this.formatEquationNode(node.children[1], state);

        state.push('/');

        this.formatEquationNode(node.children[2], state);
    };

    MathParser.prototype.formatSqrtRuleEquationRuleNode = function (node, state){
        state.push(node.children[0].candidates[node.children[0].selectedCandidate].label);
        this.formatEquationNode(node.children[1], state);
    };

    MathParser.prototype.formatSubscriptRuleEquationRuleNode = function (node, state){
        // base symbol
        this.formatEquationNode(node.children[0], state);

        // subscript symbol
        this.formatEquationNode(node.children[1], state);
    };

    MathParser.prototype.formatSuperscriptRuleEquationRuleNode = function (node, state){
        // base symbol
        this.formatEquationNode(node.children[0], state);
        // Add Superscript symbol
        state.push('^');
        // superscript symbol
        this.formatEquationNode(node.children[1], state);
   };

    MathParser.prototype.formatSubsuperscriptRuleEquationRuleNode = function (node, state){
        // base symbol
        this.formatEquationNode(node.children[0], state);
        // subscript symbol
        this.formatEquationNode(node.children[1], state);
        // superscript symbol
        this.formatEquationNode(node.children[2], state);
    };

    MathParser.prototype.formatUnderscriptRuleEquationRuleNode = function (node, state){
        // base symbol
        this.formatEquationNode(node.children[0], state);
        // bottom symbol
        this.formatEquationNode(node.children[1], state);

    };

    MathParser.prototype.formatOverscriptRuleEquationRuleNode = function (node, state) {
        // base symbol
        this.formatEquationNode(node.children[0], state);
        // top symbol
        this.formatEquationNode(node.children[1], state);
    };

    MathParser.prototype.formatUnderoverscriptRuleEquationRuleNode = function (node, state){
        // base symbol
        this.formatEquationNode(node.children[0], state);
        // bottom symbol
        this.formatEquationNode(node.children[1], state);
        // top symbol
        this.formatEquationNode(node.children[2], state);
    };

    MathParser.prototype.formatPresuperscriptRuleEquationRuleNode = function (node, state){
        // base symbol
        var ruleNode = this.getChildRuleEquationNode(node.children[0], 'sqrt');

        if (ruleNode !== null){
            this.formatEquationNode(ruleNode.children[1], state);
            this.formatEquationNode(node.children[1], state);
        } else {
            this.formatEquationNode(ruleNode.children[0], state);
            this.formatEquationNode(ruleNode.children[1], state);
        }
    };

    MathParser.prototype.formatVerticalPairRuleEquationRuleNode = function (node, state){
        // top symbol
        var ruleNode = this.getChildRuleEquationNode(node.children[0], 'vertical pair');
        if (ruleNode !== null){
            this.formatEquationNode(node.children[0], state);
        } else {
            this.formatEquationNode(node.children[0], state);
        }
        // bottom symbol
        ruleNode = this.getChildRuleEquationNode(node.children[1], 'vertical pair');

        if (ruleNode !== null){
            this.formatEquationNode(node.children[1], state);
        } else {
            this.formatEquationNode(node.children[1], state);
        }
    };

    MathParser.prototype.formatLeftFenceRuleEquationRuleNode = function (node, state){
        // left symbol is the second child
        var str = node.children[1].candidates[node.children[1].selectedCandidate].label;

        if (str !== '('){
            state.push('(').push(str);
        } else {
            state.push(str);
        }

        // main expression is the first child
        var ruleNode = this.getChildRuleEquationNode(node.children[0], 'vertical pair');
        if (ruleNode !== null) {
            this.formatEquationNode(node.children[0], state);
        } else {
            this.formatEquationNode(node.children[0], state);
        }

        state.push(')');
    };

    MathParser.prototype.getChildRuleEquationNode = function (node, name){
        if (node.type === 'terminalNode') {
            return null;
        } else if (node.type === 'nonTerminalNode') {
            return this.getChildRuleEquationNode(node.candidates[node.selectedCandidate], name);
        } else if (node.type === 'rule') {
            if (node.name === 'identity') {
                return this.getChildRuleEquationNode(node.children[0], name);
            }
        } else {
            return null;
        }
    };

// Export
scope.MathParser = MathParser;
})(MyScript);