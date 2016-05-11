$( document ).ready(function() {

    /*
     * API Setup
     */
    var API = squid_api.setup({
        "apiUrl" : "demo.openbouquet.io",
        "clientId" : "simple-app",
        "config" : {
            "project" : "dvdrental",
            "bookmark" : "56b49d9615abcc2b04c5d044"
        },
    });

    /*
     * Controller part
     */
    new API.controller.FiltersController();
    var analysis = (new API.controller.AnalysisController({
        onChangeHandler : function(analysis) {
            analysis.removeParameter("maxResults");
            squid_api.compute(analysis);
        }
    })).model;

    API.model.config.on("change", function() {
        API.saveState();
    });

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
        panelButtons : true,
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
        el : "#bookmark",
        displayName: true
    });

    bookmarkButton.$el.click(function() {
        bookmarkModal.render();
    });
    new API.view.DataVizCreator({
        el : '#editor',
        bookmarks: bookmarkCollection,
        model : analysis,
        headerText : "2. Visualize your data. Edit your D3 JS below or select your template",
        onEditorToggleChange: function(isHidden) {
            if (isHidden) {
                $(".app-config .element").slice(0, 3).addClass("inactive");
                $(".app-config").removeClass("border-present");
                $(".guide").css("opacity", 0);
                //$(".app-config .element").last().addClass("pull-right");
            } else {
                $(".app-config .element").slice(0, 3).removeClass("inactive");
                $(".app-config").addClass("border-present");
                $(".guide").css("opacity", 1);
                //$(".app-config .element").last().removeClass("pull-right");
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

    squid_api.utils.checkAPIVersion("*").done(function(v){
        $(".api-version").html(v);
    });

    /*
     * Start the App
     */
    API.init();
});
