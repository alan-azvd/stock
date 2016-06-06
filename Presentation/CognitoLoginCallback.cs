using Bridge.AWS.Cognito;
using Bridge.Pages;

namespace Stock.Presentation
{
    class CognitoLoginCallback : ICognitoLoginCallback
    {
        public void execute()
        {
            Navigation<Main>.Go();
        }
    }
}
