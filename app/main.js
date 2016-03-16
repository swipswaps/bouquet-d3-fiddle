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
        el : '#selection',
        filterPanel : '#filters',
        config : filters,
        filterSelected : '#selected',
        panelButtons : false,
        displayFacetQuantity : true,
        hoverFacetDisplay : true
    });
    new API.view.DateSelectionWidget({
        el : '#date',
        datePickerPosition: "left"
    });
    new API.view.BookmarkWidget({
        el : '#bookmark'
    });
    new API.view.DataVizCreator({
        el : '#editor',
        model : analysis
    });
    
    var projectCollection = new API.view.ProjectCollectionManagementWidget({
        onSelect: function() {
            projectModal.close();
        }
    });

    var projectModal = new API.view.ModalView({
        view : projectCollection
    });

    var projectButton = new API.view.ProjectSelectorButton({
        el : '#project'
    });

    projectButton.$el.click(function() {
        projectModal.render();
    });
    
    /*
     * Start the App
     */
    API.init();
});
