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
    var chartTable = table.clone();
    chartTable.appendTo(tabs.find('#chart'));

    flipstoneCharts.generateChartFor(chartTable, $(this.element));
    tabs.find('#chart').append('<div class="flipstone-chart-clear">');
  }
});

var flipstoneCharts = {
  init: function() {
    $('.report').report();
    flipstoneCharts.initStandaloneCharts();
  },

  initStandaloneCharts: function() {
    $('.flipstone-chart').each(function() {
      var table = $(this);
      flipstoneCharts.generateChartFor(table, table);
    });
  },

  generateChartFor: function(table, optionsElement, gvSettings) {
    var type = optionsElement.attr('data-chart-type');
    var width = optionsElement.attr('data-chart-width');
    var height = optionsElement.attr('data-chart-height');

    table.gvChart({
      chartType: type,
      gvSettings: {
        width: width ? width : 720,
        height: height ? height : 300
      }
    });
  }
}

$(flipstoneCharts.init);
