import 'babel-polyfill';
import $ from 'jquery';
import 'bootstrap' ;

$(document).ready(() => {
    $('[data-toggle="tooltip"]').tooltip();
});