for (var element in chartOptions) {
    var options = chartOptions[element];

    var container = options.container;

    if (!container)
        continue;

    container = document.querySelector(container);

    if (!container)
        continue;

    options.width = container.offsetWidth;
    options.height = container.offsetHeight;

    var selectBy = options.selectBy ? options.selectBy : "byTime";

    wesCountry.data.parseTable(options, selectBy);
}