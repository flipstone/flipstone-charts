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
  initChartApi: function() {
    google.load('visualization', '1', {packages: ['corechart']});
  },

  init: function(locator) {
    var locator = locator || $;
    locator('.report').report();
    flipstoneCharts.initStandaloneCharts(locator);
  },

  initStandaloneCharts: function(locator) {
    var locator = locator || $;
    locator('.flipstone-chart').each(function() {
      var table = $(this);
      flipstoneCharts.generateChartFor(table, table);
    });
  },

  generateChartFor: function(table, optionsElement) {
    var options = flipstoneCharts.optionsForElement(table, optionsElement);
    table.hide();
    flipstoneCharts.drawChart(table, options);
  },

  drawChart: function(table, options) {
    var chartElement = $('<div>');
    chartElement.insertBefore(table);

    var data = new google.visualization.DataTable();
    data.addColumn('string','X labels');

    table.find('tbody tr').each(function() {
      data.addColumn('number', $(this).find('th').text());
      data.addColumn({type: 'boolean', role: 'certainty'})
    });

    data.addRows(table.find('thead th').size() - 1);

    table.find('thead th').each(function(rowIndex) {
      if (rowIndex > 0) {
        data.setCell(rowIndex-1, 0, $(this).text());
      }
    });

    table.find('tbody tr').each(function(columnIndex) {
      $(this).find('td').each(function(rowIndex) {
        var formattedOption = $(this).attr('data-formatted');
        var formattedValue = null;
        var value = null;

        if (formattedOption) {
          formattedValue = formattedOption;
          value = parseFloat($(this).text());
        } else {
          formattedValue = $(this).text();
          value = parseFloat(formattedValue.replace(/[^-0-9.]/g, ''));
        }

        if ($(this).attr('data-certainty')) {
          var certainty = $(this).data('certainty');
        } else {
          var certainty = true;
        }

        data.setCell(rowIndex, (columnIndex*2) + 1, value, formattedValue);
        data.setCell(rowIndex, (columnIndex*2) + 2, certainty);
      });
    });

    var chart = new google.visualization[options.chartType](chartElement[0]);
    chart.draw(data, options.gvSettings);
  },

  optionsForElement: function(table, optionsElement) {
    var type = optionsElement.attr('data-chart-type');

    var options = {
      chartType: type,
      gvSettings: {
        title: table.find('caption').text()
      }
    };

    $.each(table[0].attributes, function() {
      match = /^data-chart-(.+)$/.exec(this.name)
      if (match && this.name != 'data-chart-type') {
        var path = match[1].split('.');

        for (var i = 0; i < path.length; i++) {
          path[i] = path[i].replace(/_[a-z]/g, function(m) {
            return m.charAt(1).toUpperCase();
          });
        }

        var target = options.gvSettings;

        for(var i = 0; i < path.length - 1; i++) {
          if (!target[path[i]]) {
            target[path[i]] = {};
          }

          target = target[path[i]];
        }

        try {
          var value = $.parseJSON(this.value);
        } catch(e) {
          var arrayMatch = /^\[([^\]]*)\]$/.exec(this.value)

          if (arrayMatch) {
            var value = arrayMatch[1].split(',')
          } else {
            var value = this.value;
          }
        }

        target[path.pop()] = value;
      }
    });

    return options;
  }
}

$(flipstoneCharts.init);
