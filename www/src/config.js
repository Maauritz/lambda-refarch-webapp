// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "6ekqbnd3g3sv8vi1tfqj0h4r52",     // CognitoClientID
  "api_base_url": "https://kcgxwqqn1j.execute-api.eu-west-1.amazonaws.com/prod",                                     // TodoFunctionApi
  "coginto_hosted_domain": "mytodoappdemo-serverless-stack.auth.eu-west-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d1184t2wp34znh.amplifyapp.com"                                      // AmplifyURL
};

export default config;
