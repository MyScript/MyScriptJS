/* global $:true */
$(function() {
    'use strict';

    // ************************************************************************* //
    //  Functions
    // ************************************************************************* //

    function setUpOptionsCheckboxes() {
        if(localStorage.getItem('options')){
            var optionsArr = JSON.parse(localStorage.options),
                optionsForm = $('#options-form');

            for(var i=0;i<optionsArr.length;i++){
                var box = optionsForm.find('input:checkbox').eq(i);
                box.prop('checked', optionsArr[i]);
                setOptionDisplayState(box);
            }
        }
    }

    function setOptionDisplayState(box) {
        var cssName = $.trim(box.parent('label').text()).toLowerCase();
        if(box.is(':checked')){
            $('div.'+cssName).css('display', 'block');
            $('li.'+cssName).css('display', 'block');
            $('span.'+cssName).css('display', 'inline');
        }else{
            $('.'+cssName).css('display', 'none');
        }
    }

    function scrollToAnchor($anchor) {
        var navbarHeight = $('.navbar-fixed-top').outerHeight(true);
        $(document).scrollTop( $anchor.offset().top - navbarHeight);
    }

    $('[data-toggle=tab]').on('click', function (event, extraArgs) {
        // Why?  If responding to the click of a link or hashchange already, we really
        //  don't want to change window hash
        if (extraArgs && extraArgs.ignore === true) {
            return;
        }
        window.location.hash = $(this).attr('href');
    });

    $('[data-tabid]').on('click', function(event) {
        var tabToActivate = $(this).attr('data-tabid'),
        anchor = $(this).attr('data-anchor');
        event.preventDefault();

        $('[data-toggle=tab][href="'+ tabToActivate + '"]').click();
        // ...huh?  http://stackoverflow.com/a/9930611
        // otherwise, can't select an element by ID if the ID has a '.' in it
        var scrollAnchor = anchor.replace(/\./g, '\\.');
        scrollToAnchor($(scrollAnchor));
        window.location.hash = anchor;
    });

    function moveToWindowHash() {
        var hash = window.location.hash,
            tabToActivate = hash,
            $tabToActivate = false,
            $scroll = $(hash);

        if (!hash) {
            return;
        }

        if (hash.match(/^#method_/)) {
            tabToActivate = '#methods';
        }
        else if (hash.match(/^#property_/)) {
            tabToActivate = '#properties';
        }
        else if (hash.match(/^#event_/)) {
            tabToActivate = '#event';
        }
        else if (hash.match(/#l\d+/)) {
            var lineNumber = /#l(\d+)/.exec(hash)[1];
            var whichLi = parseInt(lineNumber, 10) - 1; //e.g. line 1 is 0th element
            $scroll = $('ol.linenums > li').eq(whichLi);
        }

        $tabToActivate = $('[data-toggle=tab][href="'+ tabToActivate + '"]');
        if ($tabToActivate.length) {
            $tabToActivate.trigger('click', { ignore: true });
        }

        if ($scroll.length) {
            scrollToAnchor($scroll);
        }
    }

    // ************************************************************************* //
    //  Initializations + Event listeners
    // ************************************************************************* //

    //
    // Bind change events for options form checkboxes
    //
    $('#options-form input:checkbox').on('change', function(){
        setOptionDisplayState($(this));

        // Update localstorage
        var optionsArr = [];
        $('#options-form input:checkbox').each(function(i,el) {
            optionsArr.push($(el).is(':checked'));
        });
        localStorage.options = JSON.stringify(optionsArr);
    });

    function setUpHashChange() {
        $(window).on('hashchange', moveToWindowHash);
    }


    // ************************************************************************* //
    //  Immediate function calls
    // ************************************************************************* //

    setUpOptionsCheckboxes();
    setUpHashChange();
    if (window.location.hash) {
        moveToWindowHash();
    }

});
