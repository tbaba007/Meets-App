interface IResponse {
  statusText: any;
  json: any;
  text: any;
  ok: boolean;
}

export const httpJsonResponseResolver = (response: IResponse) => {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return Promise.resolve(response.json()).then((res) => {
    return res;
  });
};

export const httpTextResponseResolver = (response: IResponse) => {
  debugger;
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return Promise.resolve(response.text()).then((res) => {
    return res;
  });
};
