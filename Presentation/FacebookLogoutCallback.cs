using Bridge.Pages;

namespace Stock.Presentation
{
    class FacebookLogoutCallback : ICallback
    {
        public void execute()
        {
            Navigation<Login>.Go();
        }
    }
}
