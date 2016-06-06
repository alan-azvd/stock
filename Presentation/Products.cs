using System;
using Bridge.Html5;
using Bridge.Pages;
using Bridge.AWS.DynamoDB;

namespace Stock.Presentation
{
    class Products : Composite
    {
        public Products() : base("products") { }

        protected override void onLoad()
        {
            var newBtn = Document.GetElementById<ButtonElement>("newBtn");
            newBtn.OnClick = (ev) =>
            {
                Navigation<New>.Go();
            };

            var dynamodb = new DynamoDB();

            var param = new ScanParams
            {
                TableName = "stock",
                ProjectionExpression = "product, quantity"
            };

            dynamodb.scan(param, (err, data) =>
            {
                if (err != null)
                {
                    Toast.Error(err.stack.ToString()); // an error occurred
                }
                else
                {
                    foreach (var item in data.Items)
                    {
                        var row = new TableRowElement();

                        var productTD = new TableDataCellElement();
                        productTD.InnerHTML = item.produto.S;

                        row.AppendChild(productTD);

                        var quantityTD = new TableDataCellElement();
                        quantityTD.InnerHTML = item.quantidade.N;
                        row.AppendChild(quantityTD);

                        var editBtn = new ButtonElement();
                        editBtn.ClassName = "btn btn-default";
                        editBtn.InnerHTML = "Edit";

                        var editTD = new TableDataCellElement();
                        editTD.AppendChild(editBtn);
                        editBtn.OnClick = (ev) =>
                        {
                            Navigation<Edit>.Go(item.produto.S, int.Parse(item.quantidade.N));
                        };

                        row.AppendChild(editTD);

                        var tbody = Document.GetElementById<TableSectionElement>("table-body");
                        tbody.AppendChild(row);
                    }
                }
            });
        }
    }
}
