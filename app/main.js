$( document ).ready(function() {
    
    /*
     * API Setup
     */
    var API = squid_api.setup({
        "apiUrl" : "demo.openbouquet.io",
        "clientId" : "simple-app",
        "config" : {
            "project" : "dvdrental",
            "bookmark" : null
        },
    });
    
    /*
     * Controller part
     */
    new API.controller.FiltersController();
    var analysis = (new API.controller.AnalysisController()).model;

    /*
     * Declare the views
     */
    new API.view.LoginView();
    new API.view.StatusView();
    new API.view.CategoricalView({
        el : '#filters',
        filterSelected : '#selected',
        popup : true
    });
    new API.view.DateSelectionWidget({
        el : '#date'
    });
    new API.view.BookmarkWidget({
        el : '#bookmark'
    });

    analysis.on("change", function() {
        if (this.get("results")) {
            /*
                Sample D3 Table to display the data
             */

            // remove any existing tables created
            d3.select('#data table').remove();

            // specify the rendering div
            var container = d3.select('#data');

            // create table & append table headers
            container.append('table')
                     .append('thead')
                     .append('tr');

            // store our created table
            var table = container.select('table');

                // insert table header data
                table.select("thead tr")
                     .selectAll("th")
                     .data(this.get("results").cols)
                     .enter()
                     .append("th")
                     .text(function(d) {
                        return d.name;
                     });

                // insert table body
                table.append('tbody');

                // insert table body data
                table.select("tbody")
                    .selectAll("tr")
                    .data(this.get("results").rows)
                    .enter()
                    .append("tr").selectAll("td")
                    .data(function(d) {
                        return d.v;
                    })
                    .enter()
                    .append("td")
                    .text(function(d) {
                        return d;
                    });
        }
    });
    
    /*
     * Start the App
     */
    API.init();
});
