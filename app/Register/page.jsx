import React from "react";
import Register from "../../components/Register/Register";
import { getSession } from "next-auth/react";

// loader function
export async function loader({ request }) {
  const session = await getSession({ req: request });

  // Redirect session
  if (session) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
      },
    });
  }

  return null;
}

export default function RegisterPage() {
  return (
    <div>
      <Register />
    </div>
  );
}
