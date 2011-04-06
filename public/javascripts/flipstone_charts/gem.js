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

    options = { chartType: type, gvSettings: { } }

    $.each(table[0].attributes, function() {
      match = /^data-chart-(.+)$/.exec(this.name)
      if (match && this.name != 'data-chart-type') {
        var path = match[1].split('.');

        for (var i = 0; i < path.length; i++) {
          path[i] = path[i].replace(/_[a-z]/g, function(m) {
            return m[1].toUpperCase();
          });
        }

        var target = options.gvSettings;

        for(var i = 0; i < path.length - 1; i++) {
          if (!target[path[i]]) {
            target[path[i]] = {};
          }

          target = target[path[i]];
        }

        target[path.pop()] = this.value
      }
    });

    table.gvChart(options);
  }
}

$(flipstoneCharts.init);
