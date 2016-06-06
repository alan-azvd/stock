using System;
using Bridge.Html5;
using Bridge.Pages;
using Bridge.AWS.DynamoDB;

namespace Stock.Presentation
{
    class Edit : Page
    {
        private String product;
        private int quantity;

        public Edit(String product, int quantity)
        {
            this.product = product;
            this.quantity = quantity;
        }

        protected override void onLoad()
        {
            var productP = Document.GetElementById("productP");
            productP.InnerHTML = product;

            var quantityTxt = Document.GetElementById<InputElement>("quantityTxt");
            quantityTxt.Value = quantity.ToString();
            quantityTxt.OnChange = (ev) =>
            {
                quantity = int.Parse(quantityTxt.Value);
            };

            var toDownBtn = Document.GetElementById<ButtonElement>("toDownBtn");
            toDownBtn.OnClick = (ev) =>
            {
                if (quantity > 0)
                {
                    quantity--;
                    quantityTxt.Value = quantity.ToString();
                }
            };

            var toUpBtn = Document.GetElementById<ButtonElement>("toUpBtn");
            toUpBtn.OnClick = (ev) =>
            {
                quantity++;
                quantityTxt.Value = quantity.ToString();
            };

            var backBtn = Document.GetElementById<ButtonElement>("backBtn");
            backBtn.OnClick = (ev) => {
                Navigation<Main>.Go();
            };

            var saveBtn = Document.GetElementById<ButtonElement>("saveBtn");
            saveBtn.OnClick = (ev) =>
            {
                var param = new ItemParams
                {
                    TableName = "stock",
                    Item = new { product = new DynamoItem { S = product }, quantity = new DynamoItem { N = quantity.ToString() } }
                };

                var dynamodb = new DynamoDB();
                dynamodb.putItem(param, (err, data) =>
                {
                    if (err != null)
                    {
                        Toast.Error("Error on edit the product!");
                    }
                    else
                    {
                        Toast.Success("Success on edit the product!");
                    }
                });
            };

            var excludeBtn = Document.GetElementById<ButtonElement>("excludeBtn");
            excludeBtn.OnClick = (ev) =>
            {
                var param = new DeleteParams
                {
                    TableName = "stock",
                    Key = new { product = new DynamoItem { S = product } }
                };

                var dynamodb = new DynamoDB();
                dynamodb.deleteItem(param, (err, data) =>
                {
                    if (err != null)
                    {
                        Toast.Error("Error on exclude the product!");
                    }
                    else
                    {
                        Toast.Error("Success on exclude the product!");
                        Navigation<Main>.Go();
                    }
                });
            };
        }
    }
}
