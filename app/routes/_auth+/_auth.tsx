import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useMatches } from "@remix-run/react";
import { Outlet, redirect } from "react-router";
import { ErrorBoundryComponent } from "~/components/errors";
import SubHeading from "~/components/shared/sub-heading";
import { getAuthSession } from "~/modules/auth";
import { getUserByEmail } from "~/modules/user";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const authSession = await getAuthSession(request);

  const user = authSession
    ? await getUserByEmail(authSession?.email)
    : undefined;

  if (user && user.onboarded) {
    return redirect("assets");
  }
  return null;
};

export default function App() {
  const matches = useMatches();
  /** Find the title and subHeading from current route */
  const data = matches[matches.length - 1].data as {
    title?: string;
    subHeading?: string;
  };
  const { title, subHeading } = data;

  return (
    <div className="flex h-full min-h-screen flex-col ">
      <main className="flex h-full w-full ">
        <div className="flex h-full w-full flex-col items-center justify-center p-6 lg:p-10">
          <div className=" mb-8 text-center">
            <Link to="/">
              <img
                src="/images/Harbour.Space_Cr.png"
                alt="Shelf symbol"
                className=" mx-auto mb-2 h-12 w-12"
              />
            </Link>

            <h1>{title}</h1>
            <SubHeading className="max-w-md">{subHeading}</SubHeading>
          </div>
          <div className=" w-[360px]">
            <Outlet />
          </div>
        </div>
        <aside className="relative hidden h-full items-end justify-end p-8 lg:flex lg:w-[700px] xl:w-[900px]">
          <a
            href="https://harbour.space/"
            rel="noreferrer"
            target="_blank"
            className="relative z-20 w-[150px] text-right text-sm text-white no-underline hover:text-white"
          >
            Harbour.Space University <br />
            @UTCC
          </a>
          <img
            className="absolute inset-0 h-full w-full max-w-none object-cover"
            src="/images/auth-cover.png"
            alt="John Singer Sargent - A Corner of the Library in Venice, 1904/1907 "
          />
        </aside>
      </main>
    </div>
  );
}

export const ErrorBoundary = () => <ErrorBoundryComponent />;
