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
    var bookmarkCollection = new squid_api.view.BookmarkCollectionManagementWidget({
        onSelect: function() {
            bookmarkModal.close();
        }
    });

    var bookmarkModal = new squid_api.view.ModalView({
        view : bookmarkCollection
    });

    var bookmarkButton = new squid_api.view.BookmarkSelectorButton({
        el : "#bookmark"
    });

    bookmarkButton.$el.click(function() {
        bookmarkModal.render();
    });
    new API.view.DataVizCreator({
        el : '#editor',
        bookmarks: bookmarkCollection,
        model : analysis,
        onEditorToggleChange: function(isHidden) {
            if (isHidden) {
                $(".app-config .element:not(:last-child)").hide();
                $(".app-config .element").last().addClass("pull-right");
            } else {
                $(".app-config .element:not(:last-child)").show();
                $(".app-config .element").last().removeClass("pull-right");
            }
        }
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
