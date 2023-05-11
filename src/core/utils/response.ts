export type ResponseDto<T> = {
  statusCode: number;
  message: string;
  data: T;
};

const response = <T = unknown>(
  statusCode: number,
  message: string,
  data: T,
): ResponseDto<T> => ({
  statusCode,
  message,
  data,
});

export default response;
