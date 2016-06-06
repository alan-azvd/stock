using System;
using Bridge;
using Bridge.Pages;

namespace Stock.Presentation
{
    public class Main : Page
    {
        protected override void onLoad()
        {
            new Menu();
            new Products();
        }
    }
}
