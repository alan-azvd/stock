using Bridge;
using Bridge.Pages;
using Bridge.Html5;

namespace Stock.Presentation
{
    class Menu : Bar
    {
        protected override void onLoad()
        {
            var principalMenuBtn = Document.GetElementById<ButtonElement>("mainMenuBtn");
            principalMenuBtn.OnClick = (ev) =>
            {
                Navigation<Main>.Go();
            };
            
            var logoutBtn = Document.GetElementById<LinkElement>("logoutBtn");
            logoutBtn.OnClick = (ev) =>
            {
                Script.Call("FacebookLogout", new FacebookLogoutCallback());
            };
        }
    }
}
