// STS client API
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-sts/

import { STS, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { randomUUID } from "crypto";

export default class CredentialsService {
  private client: STS;

  constructor() {
    const config = { region: 'us-east-1' };
    this.client = new STS(config);
  }

  public async getUserCredentials(appInstanceUserARN: string) {
    const command = new AssumeRoleCommand({
      RoleArn: appInstanceUserARN,
      RoleSessionName: randomUUID(),
    })
    return this.client.send(command);
  }
}
