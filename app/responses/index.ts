const sendResponse = (
  res: any,
  status: number,
  data: any,
  error: string,
  message: string
) => {
  res
    .status(status)
    .json({ status: status, data: data, error: error, message: message });
};

export default sendResponse;
