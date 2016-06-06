using Bridge;
using Bridge.Html5;
using System;
using Bridge.Pages;
using Bridge.AWS;

namespace Stock
{
    public class App
    {
        [Ready]
        public static void Main()
        {
            AWS.config.region = Region;

            ToastConfig.config(new ToastOptions { positionClass = "toast-bottom-center" });
            new Presentation.Login();
        }

        public static String Region = "us-east-1"; // Region
        public static String FacebookAppId = "Your facebook AppId";
        public static String IdentityPoolId = "Your AWS Cognito IdentityPoolId";
    }
}