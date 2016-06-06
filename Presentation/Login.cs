using System;
using Bridge;
using Bridge.Html5;
using Bridge.Pages;
using Bridge.AWS;

namespace Stock.Presentation
{
    public class Login : Page
    {
        protected override void onLoad()
        {
            Script.Call("FacebookInit", App.FacebookAppId, new FacebookInitCallback());

            var facebookLoginBtn = Document.GetElementById<ButtonElement>("facebookLoginBtn");
            facebookLoginBtn.OnClick = (ev) => {
                Script.Call("awsCognitoFacebookLogin", App.IdentityPoolId, new CognitoLoginCallback());
            };
        }
    }
}
