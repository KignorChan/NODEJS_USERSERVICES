import { callApi, CallApiConfigSchema } from "../apiUtils/callApi";
import configs from "../../configs";

async function fileUrlSetter(fileUrl:string): Promise<string | null> {
  try {
    var body = {
      fileUrl,
    };

    var config: CallApiConfigSchema = {
      method: "POST",
      timeout: 12000,
      body: body,
      headers: null,
    };

    var result = await callApi(
      configs.fileServerHost + "/files/setter",
      config
    );

    if (result) {
      if (result["value"]) {
        if (result["value"]["fileUrl"]) {
          return result["value"]["fileUrl"];
        }
      }
    }

    return fileUrl;
  } catch (error) {
    throw error;
  }
}

async function fileUrlGetter(fileUrl:string): Promise<string | null> {
    try {
      var body = {
        fileUrl,
      };
  
      var config: CallApiConfigSchema = {
        method: "POST",
        timeout: 12000,
        body: body,
        headers: null,
      };
  
      var result = await callApi(
        configs.fileServerHost + "/files/getter",
        config
      );
  
      if (result) {
        if (result["value"]) {
          if (result["value"]["fileUrl"]) {
            return result["value"]["fileUrl"];
          }
        }
      }
  
      return fileUrl;
    } catch (error) {
      throw error;
    }
  }

export default {
  fileUrlSetter,
  fileUrlGetter,
};
