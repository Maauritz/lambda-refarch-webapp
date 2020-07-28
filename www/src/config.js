// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "16pvu6gaqadf4cjrmd1qgi1btg",     // CognitoClientID
  "api_base_url": "https://eiujak051j.execute-api.eu-west-1.amazonaws.com/prod",                                     // TodoFunctionApi
  "coginto_hosted_domain": "mytodoappdemo-serverless-stack.auth.eu-west-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d19ytbicxmt7i9.amplifyapp.com"                                      // AmplifyURL
};

export default config;
