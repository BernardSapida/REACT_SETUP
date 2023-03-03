import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import NavigationBar from "../navigation/NavigationBar";

function Error() {
  const error = useRouteError();
  let error_status: number;
  let error_title: string;
  let error_message: string;

  if (isRouteErrorResponse(error)) {
    error_status = error.status;
    error_title = error.statusText;
    error_message = error.data;

    return (
      <>
        <NavigationBar />
        <article className="container my-5 text-center">
          <h1 className="fw-bolder fs-1">{error_status}</h1>
          <h3>Page {error_title || "Error"}</h3>
          <p className="text-secondary">{error_message}</p>
        </article>
      </>
    );
  }

  return (
    <>
      {" "}
      <NavigationBar />
      <article className="container my-5 text-center">
        <h1 className="fw-bolder fs-1">Oops...</h1>
        <h3>There was an error</h3>
      </article>
    </>
  );
}

export default Error;
