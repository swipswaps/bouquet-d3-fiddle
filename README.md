Bouquet Bookmark D3 app (BBD3)
==============================

The BBD3 app allows you in 3 simple steps how to use OB Bookmarks to quickly publish an interactive D3.js data visualization on top of a database. As a result, your D3.js data visualizations become connected in real time to any database.

You can test the [demo online](https://openbouquet.io/apps/release/bouquet-d3-fiddle) on some sample database.

If you want to go further, you can quickly fork this demonstration app to build your own analytics app on top of any database using Open Bouquet server & API. 
In order to use Open Bouquet on your own database, please review the options to [install the stack locally](https://bouquet.zendesk.com/hc/en-us/sections/201662245-Install-guides).

Compiling the BBD3 application
------------------------------

Handles user login and displays a status message in a sample widget.  
Download/Clone a release and use it as a skeleton for your project.  

It uses the standard stack : 
* [Bootstrap](http://getbootstrap.com/) for html layout.
* [Bower](http://bower.io/) for js libraries management.
* [Grunt](http://gruntjs.com/) for building the app.
* [Backbone.js](http://backbonejs.org/) as the js MVC.

Along with our JSSDK components :  
* [JSSDK](https://github.com/squidsolutions/jssdk2)
* [Core Widgets](https://github.com/squidsolutions/jssdk-core-widgets)

## running

Install the dependencies
```
npm install
bower install
```

Build (without cache busting)
```
grunt build
````

Watch for future code changes (and automatically rebuild)
```
grunt watch
````

Edit the app/main.js file to match your Project's settings


View the build results
```
open dist/index.html
`````
