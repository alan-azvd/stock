using System;
using Bridge.Html5;
using Bridge.Pages;
using Bridge.AWS.DynamoDB;

namespace Stock.Presentation
{
    class New : Page
    {
        private int Quantity;

        protected override void onLoad()
        {
            var productTxt = Document.GetElementById<InputElement>("productTxt");
            productTxt.Focus();

            var quantityTxt = Document.GetElementById<InputElement>("quantityTxt");
            quantityTxt.Value = "0";
            quantityTxt.OnChange = (ev) =>
            {
                Quantity = int.Parse(quantityTxt.Value);
            };

            var toDownBtn = Document.GetElementById<ButtonElement>("toDownBtn");
            toDownBtn.OnClick = (ev) =>
            {
                if (Quantity > 0)
                {
                    Quantity--;
                    quantityTxt.Value = Quantity.ToString();
                }
            };

            var toUpBtn = Document.GetElementById<ButtonElement>("toUpBtn");
            toUpBtn.OnClick = (ev) =>
            {
                Quantity++;
                quantityTxt.Value = Quantity.ToString();
            };

            var backBtn = Document.GetElementById<ButtonElement>("backBtn");
            backBtn.OnClick = (ev) => {
                Navigation<Main>.Go();
            };

            var saveBtn = Document.GetElementById<ButtonElement>("saveBtn");
            saveBtn.OnClick = (ev) =>
            {
                var dynamodb = new DynamoDB();

                var paramGet = new GetParams
                {
                    TableName = "stock",
                    Key = new { product = new DynamoItem { S = productTxt.Value } }
                };

                dynamodb.getItem(paramGet, (errGet, dataGet) =>
                {
                    if (dataGet.Item == null )
                    {
                        var paramPut = new ItemParams
                        {
                            TableName = "stock",
                            Item = new { product = new DynamoItem { S = productTxt.Value }, quantity = new DynamoItem { N = Quantity.ToString() } }
                        };

                        dynamodb.putItem(paramPut, (errPut, dataPut) =>
                        {
                            if (errPut != null)
                            {
                                Toast.Error("A Error ocorred on include the product!");
                            }
                            else
                            {
                                productTxt.Value = String.Empty;
                                quantityTxt.Value = "0";
                                Quantity = 0;
                                productTxt.Focus();
                                Toast.Success("Sucess included product!");
                            }
                        });
                    }
                    else
                    {
                        Toast.Error("Product alredy exist!");
                    }
                });
            };
        }
    }
}
