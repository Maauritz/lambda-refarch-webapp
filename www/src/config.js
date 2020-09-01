// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "6dtsthkcjeq8jblinsaj8jm6fi",     // CognitoClientID
  "api_base_url": "https://0aq1h6howg.execute-api.eu-west-1.amazonaws.com/prod",                                     // TodoFunctionApi
  "coginto_hosted_domain": "mytodoappdemo-serverless-stack.auth.eu-west-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d14hj5v8zenkzy.amplifyapp.com"                                      // AmplifyURL
};

export default config;
