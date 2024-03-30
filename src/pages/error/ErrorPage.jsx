import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-4xl mb-6 font-titleFont font-bold">
          {error.status || error.code}
        </h1>
        <p>{error.message}</p>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>
        {error.status === 404 && (
          <p className="mt-4 text-gray-500">We can't find that page.</p>
        )}

        <a href="/" className="btn btn-primary m-5">
          Go Back Home
        </a>
      </div>
    </div>
  );
}
