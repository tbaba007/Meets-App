import { httpJsonResponseResolver, httpTextResponseResolver } from "./HttpResponseHelper";
const baseUrl = process.env.REACT_APP_API;

interface IHttpProps {
  path: string;
  payload?: any;
  type?: string;
}

const RequestHeader = (type: any, payload?: any) => {
  return {
    method: type,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  };
};

export const GET =  ({ path }: IHttpProps) => {
  const method = "GET";
  return fetch(`${baseUrl}/${path}`, RequestHeader(method)).then(
    httpJsonResponseResolver
  );
};

export const POST = async ({ path, payload }: IHttpProps) => {
  const method = "POST";
  return fetch(`${baseUrl}/${path}`, RequestHeader(method, payload)).then(
    httpJsonResponseResolver
  )
};

export const PUT = async ({ path, payload }: IHttpProps) => {
    const method="PUT"
    return fetch(`${baseUrl}/${path}`, RequestHeader(method, payload)).then(
      httpTextResponseResolver
      )
};

export const PATCH=async({path,payload}: IHttpProps)=>{
  const method="PATCH"
  return fetch(`${baseUrl}/${path}`,RequestHeader(method, payload)).then(
    httpTextResponseResolver
  )
}

export const DELETE= async({path,payload}:IHttpProps)=>{
  const method="DELETE"
  return fetch(`${baseUrl}/${path}`,RequestHeader(method)).then(httpTextResponseResolver)
}