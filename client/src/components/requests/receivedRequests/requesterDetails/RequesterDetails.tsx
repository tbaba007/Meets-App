import React from "react";
import { IRequestProps } from "../../sentRequests/types";
import { RequestContainer } from "./styles";

function RequesterDetails(data: IRequestProps): JSX.Element {
  return (
    <>
      <RequestContainer>
        <th></th>
        <th></th>
        <th>FirstName</th>
        <th>LastName</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>StudentId</th>
        <th></th>
      </RequestContainer>

      <tr>
        <td></td>
        <td></td>

        <td>{data.FirstName}</td>
        <td>{data.LastName}</td>
        <td>{data.Email}</td>
        <td>{data.Mobile}</td>
        <td>{data.StudentId}</td>
        <td></td>
      </tr>
    </>
  );
}

export default RequesterDetails;
