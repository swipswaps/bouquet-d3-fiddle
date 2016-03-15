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
    

    var editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/javascript");

    var editorContents = function(dataviz) {
        var body = "";
        if (dataviz) {
            body = dataviz;
        }
        editor.getSession().setValue(body);
    };

    editorContents();

    API.model.config.on("change:dataviz", function() {
        editorContents(this.get("dataviz")[0].body);
    });

    var f;
    
    $("#apply").click(function() {
        var body = editor.getSession().getValue();
        console.log(body);
        /*jslint evil: true */
        f = new Function('analysis', body);
        analysis.on("change:results", f);
        if (analysis.get("results")) {
            analysis.trigger("change:results", analysis);
        }

        // set config
        var dataViz = squid_api.model.config.get("dataviz");
        var arr = [];
        var length = 0;
        if (dataViz) {
            arr = dataViz;
            length = dataViz.length;
        }
        arr.push({id : "squid-dataviz-" + (length + 1), body: body});
        squid_api.model.config.set("dataviz", arr);
    });

    
    /*
     * Start the App
     */
    API.init();
});
