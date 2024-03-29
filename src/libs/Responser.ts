type responseInterface = {
  statusCode: number;
  message: string;
  body: any;
};

export const Responser = ({ statusCode, message, body }: responseInterface) => {
  return {
    meta: {
      success: statusCode >= 200 && statusCode <= 300 ? true : false,
      message: message,
    },
    body: body,
  };
};
