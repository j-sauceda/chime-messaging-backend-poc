// Chime SDK Messaging API:
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-chime-sdk-messaging/Class/ChimeSDKMessaging/

import {
  ChimeSDKMessagingClient,
  CreateChannelCommand,
  CreateChannelMembershipCommand,
  ListChannelsCommand,
  DeleteChannelCommand,
  SendChannelMessageCommand,
  ListChannelMessagesCommand,
  DeleteChannelMessageCommand,
  GetMessagingSessionEndpointCommand
} from "@aws-sdk/client-chime-sdk-messaging";

export default class MessagingService {
  private client: ChimeSDKMessagingClient;

  constructor() {
    const config = { region: 'us-east-1' };
    this.client = new ChimeSDKMessagingClient(config);
  }

  // about createChannelCommandInput
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-messaging/interfaces/createchannelcommandinput.html
  public async createChannel(appInstanceARN: string, channelName: string, channelId: string, appInstanceUserARN: string) {
    const params = {
      AppInstanceArn: appInstanceARN, // required
      Name: channelName, // required
      Mode: "UNRESTRICTED", // "UNRESTRICTED" || "RESTRICTED", // not required
      Privacy: "PUBLIC", // "PUBLIC" || "PRIVATE",
      // Metadata: "STRING_VALUE",
      // ClientRequestToken: "STRING_VALUE", // not required
      // Tags: [ // TagList
      //     { // Tag
      //       Key: "STRING_VALUE", // required
      //       Value: "STRING_VALUE", // required
      //     },
      // ],
      ChimeBearer: appInstanceUserARN, // required
      ChannelId: channelId,
      // MemberArns: [ // ChannelMemberArns
      //     "STRING_VALUE",
      // ],
      // ModeratorArns: [ // ChannelModeratorArns
      //     "STRING_VALUE",
      // ],
      // ElasticChannelConfiguration: { // ElasticChannelConfiguration
      //     MaximumSubChannels: Number("int"), // required
      //     TargetMembershipsPerSubChannel: Number("int"), // required
      //     MinimumMembershipPercentage: Number("int"), // required
      // },
      // ExpirationSettings: { // ExpirationSettings
      //     ExpirationDays: Number("int"), // required
      //     ExpirationCriterion: "CREATED_TIMESTAMP" || "LAST_MESSAGE_TIMESTAMP", // required
      // },
    };
    const command = new CreateChannelCommand(params);
    return this.client.send(command);
  }

  // about ListChannelsCommandInput
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-messaging/interfaces/createchannelcommandinput.html
  public async listChannels(appInstanceARN: string, appInstanceUserARN: string) {
    const params = {
      AppInstanceArn: appInstanceARN, // required
      // Privacy: "PUBLIC" || "PRIVATE",
      // MaxResults: Number("int"),
      // NextToken: "STRING_VALUE",
      ChimeBearer: appInstanceUserARN, // required
    };
    const command = new ListChannelsCommand(params);
    return this.client.send(command);
  }

  // about createChannelMembershipCommandInput
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-messaging/interfaces/createchannelmembershipcommandinput.html
  public async joinChannel(channelARN: string, userARN: string ) {
    const params = {
      ChannelArn: channelARN, // required
      MemberArn: userARN, // required
      Type: "DEFAULT", // "DEFAULT" || "HIDDEN", // required
      ChimeBearer: userARN, // required
      // SubChannelId: "STRING_VALUE", // not required
    }
    const command = new CreateChannelMembershipCommand(params);
    return this.client.send(command);
  }

  // about DeleteChannelCommandInput
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-messaging/interfaces/deletechannelcommandinput.html
  public async deleteChannel(channelARN: string, appInstanceUserARN: string) {
    const params = {
      ChannelArn: channelARN, // required
      ChimeBearer: appInstanceUserARN, // required
      // SubChannelId: "STRING_VALUE",
    };
    const command = new DeleteChannelCommand(params);
    return this.client.send(command);
  }

  // about SendChannelMessageCommandInput
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-messaging/classes/sendchannelmessagecommand.html
  public async sendMessage(channelARN: string, content: string, appInstanceUserARN: string) {
    const params = {
      ChannelArn: channelARN, // required
      Content: content, // required
      Type: "STANDARD", // "STANDARD" || "CONTROL", // required
      Persistence: "PERSISTENT", // "PERSISTENT" || "NON_PERSISTENT", // required
      // Metadata: "STRING_VALUE",
      // ClientRequestToken: "STRING_VALUE", // not required
      ChimeBearer: appInstanceUserARN, // required
      // PushNotification: { // PushNotificationConfiguration
      //     Title: "STRING_VALUE",
      //     Body: "STRING_VALUE",
      //     Type: "DEFAULT" || "VOIP",
      // },
      // MessageAttributes: { // MessageAttributeMap
      //     "<keys>": { // MessageAttributeValue
      //         StringValues: [ // MessageAttributeStringValues
      //             "STRING_VALUE",
      //         ],
      //     },
      // },
      // SubChannelId: "STRING_VALUE",
      // ContentType: "STRING_VALUE",
    };
    const command = new SendChannelMessageCommand(params);
    return this.client.send(command);
  }

  // about ListChannelMessagesCommandInput
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-messaging/interfaces/listchannelmessagescommandinput.html
  public async listMessages(channelARN: string, appInstanceUserARN: string) {
    const params = {
      ChannelArn: channelARN, // required
      // SortOrder: "ASCENDING" || "DESCENDING",
      // NotBefore: new Date("TIMESTAMP"),
      // NotAfter: new Date("TIMESTAMP"),
      // MaxResults: Number("int"),
      // NextToken: "STRING_VALUE",
      ChimeBearer: appInstanceUserARN, // required
      // SubChannelId: "STRING_VALUE",
    };
    const command = new ListChannelMessagesCommand(params);
    return this.client.send(command);
  }

  // about DeleteChannelMessageCommandInput
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-chime-sdk-messaging/interfaces/deletechannelcommandinput.html
  public async deleteMessage(channelARN: string, messageId: string, appInstanceUserARN: string) {
    const params = {
      ChannelArn: channelARN, // required
      MessageId: messageId, // required
      ChimeBearer: appInstanceUserARN, // required
      // SubChannelId: "STRING_VALUE",
    };
    const command = new DeleteChannelMessageCommand(params);
    return this.client.send(command);
  }

  public async getSessionEndpoint() {
    const command = new GetMessagingSessionEndpointCommand({});
    return this.client.send(command);
  }
}
