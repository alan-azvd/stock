using Bridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock.Presentation
{
    class FacebookInitCallback : ICallback
    {
        public void execute()
        {
            Script.Call("awsCognitoFacebookLogin", App.IdentityPoolId, new CognitoLoginCallback());
        }
    }
}
