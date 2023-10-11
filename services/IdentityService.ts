// about the Amazon Chime SDK Identity APIs:
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-identity/

import {
  ChimeSDKIdentityClient,
  CreateAppInstanceCommand,
  ListAppInstancesCommand,
  DeleteAppInstanceCommand,
  CreateAppInstanceUserCommand,
  ListAppInstanceUsersCommand,
  DeleteAppInstanceUserCommand
} from "@aws-sdk/client-chime-sdk-identity";
import { randomUUID } from "crypto";

export default class IdentityService {
  private client: ChimeSDKIdentityClient;

  constructor() {
    const config = { region: 'us-east-1' };
    this.client = new ChimeSDKIdentityClient(config);
  }

  // about the CreateAppInstanceCommand:
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-identity/classes/createappinstancecommand.html
  public async createInstance(instanceName: string) {
    const params = {
      Name: instanceName, // required
      // Metadata: "STRING_VALUE",
      ClientRequestToken: randomUUID(), // required
      // Tags: [ // TagList
      //   { // Tag
      //     Key: "STRING_VALUE", // required
      //     Value: "STRING_VALUE", // required
      //   },
      // ],
    };
    const command = new CreateAppInstanceCommand(params);
    return this.client.send(command);
  }

  // about ListAppInstancesCommand:
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-identity/classes/listappinstancescommand.html
  public async listInstances() {
    const params = {
      // MaxResults: Number("int"),
      // NextToken: "STRING_VALUE",
    };
    const command = new ListAppInstancesCommand(params);
    return this.client.send(command);
  }

  // about DeleteAppInstanceCommandInput:
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-identity/classes/deleteappinstancecommand.html
  public async deleteInstance(appInstanceARN: string) {
    const params = {
      AppInstanceArn: appInstanceARN, // required
    };
    const command = new DeleteAppInstanceCommand(params);
    return this.client.send(command);
  }

  // about CreateAppInstanceUserCommand:
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-identity/classes/createappinstanceusercommand.html
  public async createUser(appARN: string, userId: string, userName: string) {
    const params = {
      AppInstanceArn: appARN, // required
      AppInstanceUserId: userId, // required
      Name: userName, // required
      // Metadata: "STRING_VALUE",
      // ClientRequestToken: "STRING_VALUE", // not required
      // Tags: [ // TagList
      //   { // Tag
      //     Key: "STRING_VALUE", // required
      //     Value: "STRING_VALUE", // required
      //   },
      // ],
      // ExpirationSettings: { // ExpirationSettings
      //   ExpirationDays: Number("int"), // required
      //   ExpirationCriterion: "CREATED_TIMESTAMP", // required
      // },
    };
    const command = new CreateAppInstanceUserCommand(params);
    return this.client.send(command);
  }

  // about ListAppInstanceUsersCommand:
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-identity/classes/listappinstanceuserscommand.html
  public async listUsers(appInstanceARN: string) {
    const params = {
      AppInstanceArn: appInstanceARN, // required
      // MaxResults: Number("int"),
      // NextToken: "STRING_VALUE",
    };
    const command = new ListAppInstanceUsersCommand(params);
    return this.client.send(command);
  }

  // about DeleteAppInstanceUserCommand:
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-identity/classes/deleteappinstanceusercommand.html
  public async deleteUser(appInstanceUserARN: string) {
    const params = {
      AppInstanceUserArn: appInstanceUserARN, // required
    };
    const command = new DeleteAppInstanceUserCommand(params);
    return this.client.send(command);
  }
}
