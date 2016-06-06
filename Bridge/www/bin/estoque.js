(function (globals) {
    "use strict";

    Bridge.define('Stock.App', {
        statics: {
            Region: "us-east-1",
            FacebookAppId: "Your facebook AppId",
            IdentityPoolId: "Your AWS Cognito IdentityPoolId",
            config: {
                init: function () {
                    Bridge.ready(this.Main);
                }
            },
            Main: function () {
                AWS.config.region = Stock.App.Region;
    
                Bridge.Pages.ToastConfig.config({ positionClass: "toast-bottom-center" });
                new Stock.Presentation.Login();
            }
        }
    });
    
    Bridge.define('Stock.Presentation.CognitoLoginCallback', {
        inherits: [Bridge.AWS.Cognito.ICognitoLoginCallback],
        execute: function () {
            Bridge.Pages.Navigation$1(Stock.Presentation.Main).go();
        }
    });
    
    Bridge.define('Stock.Presentation.Edit', {
        inherits: [Bridge.Pages.Page],
        product: null,
        quantity: 0,
        constructor: function (product, quantity) {
            Bridge.Pages.Page.prototype.$constructor.call(this);
    
            this.product = product;
            this.quantity = quantity;
        },
        onLoad: function () {
            var productP = document.getElementById("productP");
            productP.innerHTML = this.product;
    
            var quantityTxt = document.getElementById("quantityTxt");
            quantityTxt.value = this.quantity.toString();
            quantityTxt.onchange = Bridge.fn.bind(this, function (ev) {
                this.quantity = Bridge.Int32.parse(quantityTxt.value);
            });
    
            var toDownBtn = document.getElementById("toDownBtn");
            toDownBtn.onclick = Bridge.fn.bind(this, function (ev) {
                if (this.quantity > 0) {
                    this.quantity = (this.quantity - 1) | 0;
                    quantityTxt.value = this.quantity.toString();
                }
            });
    
            var toUpBtn = document.getElementById("toUpBtn");
            toUpBtn.onclick = Bridge.fn.bind(this, function (ev) {
                this.quantity = (this.quantity + 1) | 0;
                quantityTxt.value = this.quantity.toString();
            });
    
            var backBtn = document.getElementById("backBtn");
            backBtn.onclick = $_.Stock.Presentation.Edit.f1;
    
            var saveBtn = document.getElementById("saveBtn");
            saveBtn.onclick = Bridge.fn.bind(this, $_.Stock.Presentation.Edit.f3);
    
            var excludeBtn = document.getElementById("excludeBtn");
            excludeBtn.onclick = Bridge.fn.bind(this, $_.Stock.Presentation.Edit.f5);
        }
    });
    
    var $_ = {};
    
    Bridge.ns("Stock.Presentation.Edit", $_)
    
    Bridge.apply($_.Stock.Presentation.Edit, {
        f1: function (ev) {
            Bridge.Pages.Navigation$1(Stock.Presentation.Main).go();
        },
        f2: function (err, data) {
            if (err != null) {
                Bridge.Pages.Toast.error("Error on edit the product!");
            }
            else  {
                Bridge.Pages.Toast.success("Success on edit the product!");
            }
        },
        f3: function (ev) {
            var param = { TableName: "stock", Item: { product: { S: this.product }, quantity: { N: this.quantity.toString() } } };
    
            var dynamodb = new Bridge.AWS.DynamoDB.DynamoDB();
            dynamodb.putItem(param, $_.Stock.Presentation.Edit.f2);
        },
        f4: function (err, data) {
            if (err != null) {
                Bridge.Pages.Toast.error("Error on exclude the product!");
            }
            else  {
                Bridge.Pages.Toast.error("Success on exclude the product!");
                Bridge.Pages.Navigation$1(Stock.Presentation.Main).go();
            }
        },
        f5: function (ev) {
            var param = { TableName: "stock", Key: { product: { S: this.product } } };
    
            var dynamodb = new Bridge.AWS.DynamoDB.DynamoDB();
            dynamodb.deleteItem(param, $_.Stock.Presentation.Edit.f4);
        }
    });
    
    Bridge.define('Stock.Presentation.ICallback');
    
    Bridge.define('Stock.Presentation.Login', {
        inherits: [Bridge.Pages.Page],
        onLoad: function () {
            FacebookInit(Stock.App.FacebookAppId, new Stock.Presentation.FacebookInitCallback());
    
            var facebookLoginBtn = document.getElementById("facebookLoginBtn");
            facebookLoginBtn.onclick = $_.Stock.Presentation.Login.f1;
        }
    });
    
    Bridge.ns("Stock.Presentation.Login", $_)
    
    Bridge.apply($_.Stock.Presentation.Login, {
        f1: function (ev) {
            awsCognitoFacebookLogin(Stock.App.IdentityPoolId, new Stock.Presentation.CognitoLoginCallback());
        }
    });
    
    Bridge.define('Stock.Presentation.Main', {
        inherits: [Bridge.Pages.Page],
        onLoad: function () {
            new Stock.Presentation.Menu();
            new Stock.Presentation.Products();
        }
    });
    
    Bridge.define('Stock.Presentation.Menu', {
        inherits: [Bridge.Pages.Bar],
        onLoad: function () {
            var principalMenuBtn = document.getElementById("mainMenuBtn");
            principalMenuBtn.onclick = $_.Stock.Presentation.Menu.f1;
    
            var logoutBtn = document.getElementById("logoutBtn");
            logoutBtn.onclick = $_.Stock.Presentation.Menu.f2;
        }
    });
    
    Bridge.ns("Stock.Presentation.Menu", $_)
    
    Bridge.apply($_.Stock.Presentation.Menu, {
        f1: function (ev) {
            Bridge.Pages.Navigation$1(Stock.Presentation.Main).go();
        },
        f2: function (ev) {
            FacebookLogout(new Stock.Presentation.FacebookLogoutCallback());
        }
    });
    
    Bridge.define('Stock.Presentation.New', {
        inherits: [Bridge.Pages.Page],
        Quantity: 0,
        onLoad: function () {
            var productTxt = document.getElementById("productTxt");
            productTxt.focus();
    
            var quantityTxt = document.getElementById("quantityTxt");
            quantityTxt.value = "0";
            quantityTxt.onchange = Bridge.fn.bind(this, function (ev) {
                this.Quantity = Bridge.Int32.parse(quantityTxt.value);
            });
    
            var toDownBtn = document.getElementById("toDownBtn");
            toDownBtn.onclick = Bridge.fn.bind(this, function (ev) {
                if (this.Quantity > 0) {
                    this.Quantity = (this.Quantity - 1) | 0;
                    quantityTxt.value = this.Quantity.toString();
                }
            });
    
            var toUpBtn = document.getElementById("toUpBtn");
            toUpBtn.onclick = Bridge.fn.bind(this, function (ev) {
                this.Quantity = (this.Quantity + 1) | 0;
                quantityTxt.value = this.Quantity.toString();
            });
    
            var backBtn = document.getElementById("backBtn");
            backBtn.onclick = $_.Stock.Presentation.New.f1;
    
            var saveBtn = document.getElementById("saveBtn");
            saveBtn.onclick = Bridge.fn.bind(this, function (ev) {
                var dynamodb = new Bridge.AWS.DynamoDB.DynamoDB();
    
                var paramGet = { TableName: "stock", Key: { product: { S: productTxt.value } } };
    
                dynamodb.getItem(paramGet, Bridge.fn.bind(this, function (errGet, dataGet) {
                    if (dataGet.Item == null) {
                        var paramPut = { TableName: "stock", Item: { product: { S: productTxt.value }, quantity: { N: this.Quantity.toString() } } };
    
                        dynamodb.putItem(paramPut, Bridge.fn.bind(this, function (errPut, dataPut) {
                            if (errPut != null) {
                                Bridge.Pages.Toast.error("A Error ocorred on include the product!");
                            }
                            else  {
                                productTxt.value = "";
                                quantityTxt.value = "0";
                                this.Quantity = 0;
                                productTxt.focus();
                                Bridge.Pages.Toast.success("Sucess included product!");
                            }
                        }));
                    }
                    else  {
                        Bridge.Pages.Toast.error("Product alredy exist!");
                    }
                }));
            });
        }
    });
    
    Bridge.ns("Stock.Presentation.New", $_)
    
    Bridge.apply($_.Stock.Presentation.New, {
        f1: function (ev) {
            Bridge.Pages.Navigation$1(Stock.Presentation.Main).go();
        }
    });
    
    Bridge.define('Stock.Presentation.Products', {
        inherits: [Bridge.Pages.Composite],
        constructor: function () {
            Bridge.Pages.Composite.prototype.$constructor.call(this, "products");
    
        },
        onLoad: function () {
            var newBtn = document.getElementById("newBtn");
            newBtn.onclick = $_.Stock.Presentation.Products.f1;
    
            var dynamodb = new Bridge.AWS.DynamoDB.DynamoDB();
    
            var param = { TableName: "stock", ProjectionExpression: "product, quantity" };
    
            dynamodb.scan(param, function (err, data) {
                var $t;
                if (err != null) {
                    Bridge.Pages.Toast.error(err.stack.toString()); // an error occurred
                }
                else  {
                    $t = Bridge.getEnumerator(data.Items);
                    while ($t.moveNext()) {
                        (function () {
                            var item = $t.getCurrent();
                            var row = document.createElement('tr');
    
                            var productTD = document.createElement('td');
                            productTD.innerHTML = item.produto.S;
    
                            row.appendChild(productTD);
    
                            var quantityTD = document.createElement('td');
                            quantityTD.innerHTML = item.quantidade.N;
                            row.appendChild(quantityTD);
    
                            var editBtn = document.createElement('button');
                            editBtn.className = "btn btn-default";
                            editBtn.innerHTML = "Edit";
    
                            var editTD = document.createElement('td');
                            editTD.appendChild(editBtn);
                            editBtn.onclick = function (ev) {
                                Bridge.Pages.Navigation$1(Stock.Presentation.Edit).go$1([item.produto.S, Bridge.Int32.parse(item.quantidade.N)]);
                            };
    
                            row.appendChild(editTD);
    
                            var tbody = document.getElementById("table-body");
                            tbody.appendChild(row);
                        }).call(this);
                    }
                }
            });
        }
    });
    
    Bridge.ns("Stock.Presentation.Products", $_)
    
    Bridge.apply($_.Stock.Presentation.Products, {
        f1: function (ev) {
            Bridge.Pages.Navigation$1(Stock.Presentation.New).go();
        }
    });
    
    Bridge.define('Stock.Presentation.FacebookInitCallback', {
        inherits: [Stock.Presentation.ICallback],
        execute: function () {
            awsCognitoFacebookLogin(Stock.App.IdentityPoolId, new Stock.Presentation.CognitoLoginCallback());
        }
    });
    
    Bridge.define('Stock.Presentation.FacebookLogoutCallback', {
        inherits: [Stock.Presentation.ICallback],
        execute: function () {
            Bridge.Pages.Navigation$1(Stock.Presentation.Login).go();
        }
    });
    
    Bridge.init();
})(this);
