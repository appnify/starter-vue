export const config = {
  getApiErrorMessage(error: any) {
    return error?.response?.data?.message || error?.message || "Error";
  },
};
