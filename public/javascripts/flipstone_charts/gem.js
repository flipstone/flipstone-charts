$.widget('ui.report', {
  _init: function() {
    var table = $(this.element).find('table');
    var tabs = $('<div>');
    var ul = tabs.append('<ul>')
    tabs.find('ul').append('<li><a href="#chart">Chart</a></li>')
    tabs.find('ul').append('<li><a href="#data">Data</a></li>')

    tabs.append('<div id="chart">')
    tabs.append('<div id="data">')
    tabs.find('#data').append(table);
    $(this.element).html(tabs);
    tabs.tabs();
    var type = $(this.element).attr('data-chart-type');
    table.visualize({type: type}).appendTo(tabs.find('#chart')).trigger('visualizeRefresh');
    tabs.find('#chart').append('<div class="flipstone-chart-clear">');
  }
});

$(function() {
  $('.report').report();
});

