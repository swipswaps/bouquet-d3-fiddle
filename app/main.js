$( document ).ready(function() {
    
    /*
     * API Setup
     */
    var API = squid_api.setup({
        "apiUrl" : "api.squidsolutions.com",
        "clientId" : "bouquet-app-simple",
        "config" : {
            "project" : null,
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
    new API.view.DataTableView ({
        el : '#data',
        model : analysis
    });
    new API.view.CategoricalView({
        el : '#filters',
        filterSelected : '#selected'
    });
    new API.view.DateSelectionWidget({
        el : '#date'
    });
    
    /*
     * Start the App
     */
    API.init();
});
