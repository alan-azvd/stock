(function (globals) {
    "use strict";

    Bridge.define('Bridge.Pages.BasePage', {
        config: {
            properties: {
                View: null
            }
        },
        load: function (container) {
            if (Bridge.String.isNullOrEmpty(this.getView())) {
                this.setView("pages/" + this.getComponentName() + ".html");
            }
    
            $(container).load(this.getView(), null, Bridge.fn.bind(this, $_.Bridge.Pages.BasePage.f1));
        },
        getComponentName: function () {
            var index = Bridge.getTypeName(this).lastIndexOf(".");
            var componentName = Bridge.getTypeName(this).substr(((index + 1) | 0));
            return componentName.toLowerCase();
        }
    });
    
    var $_ = {};
    
    Bridge.ns("Bridge.Pages.BasePage", $_)
    
    Bridge.apply($_.Bridge.Pages.BasePage, {
        f1: function (responseText, textStatus, jqXHR) {
            this.onLoad();
        }
    });
    
    Bridge.define('Bridge.Pages.Toast', {
        statics: {
            config: {
                properties: {
                    options: null
                }
            },
            success: function (message) {
                toastr.success(message);
            },
            success$1: function (message, title) {
                toastr.success(message, title);
            },
            info: function (message) {
                toastr.info(message);
            },
            info$1: function (message, title) {
                toastr.info(message, title);
            },
            warning: function (message) {
                toastr.warning(message);
            },
            warning$1: function (message, title) {
                toastr.warning(message, title);
            },
            error: function (message) {
                toastr.error(message);
            },
            error$1: function (message, title) {
                toastr.error(message, title);
            }
        }
    });
    
    Bridge.define('Bridge.Pages.ToastConfig', {
        statics: {
            config: function (options) {
                toastr.options = options;
            }
        }
    });
    
    Bridge.define('Bridge.Pages.Bar', {
        inherits: [Bridge.Pages.BasePage],
        constructor: function () {
            Bridge.Pages.BasePage.prototype.$constructor.call(this);
    
            this.load("bar");
        }
    });
    
    Bridge.define('Bridge.Pages.Composite', {
        inherits: [Bridge.Pages.BasePage],
        constructor: function (container) {
            Bridge.Pages.BasePage.prototype.$constructor.call(this);
    
            this.load(container);
        }
    });
    
    Bridge.define('Bridge.Pages.Page', {
        inherits: [Bridge.Pages.BasePage],
        constructor: function () {
            Bridge.Pages.BasePage.prototype.$constructor.call(this);
    
            this.load("page");
        }
    });
    
    Bridge.define('Bridge.Pages.Navigation$1', function (T) { return {
        statics: {
            go: function () {
                Bridge.createInstance(T);
            },
            go$1: function (param) {
                var $t;
                if (param === void 0) { param = []; }
                var s = "";
                $t = Bridge.getEnumerator(param);
                while ($t.moveNext()) {
                    var obj = $t.getCurrent();
                    var o = "";
    
                    if (Bridge.equals(Bridge.getType(obj), String)) {
                        o = "'" + obj.toString() + "'";
                    }
                    else  {
                        o = obj.toString();
                    }
                    s = s + o + ",";
                }
                s = Bridge.String.remove(s, s.lastIndexOf(","));
                eval(Bridge.String.format("new {0}({1})", Bridge.getTypeName(T), s));
            }
        }
    }; });
    
    Bridge.init();
})(this);
