import { NextResponse } from "next/server";

import { createUser } from "@/libs/users";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await createUser(data);

    if (!result.success) {
      // error for validation error and uniqueness constraint
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    } else {
      // success
      return NextResponse.json({ user: result.data }, { status: 201 })
    }

  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    return NextResponse.json(
      { error: "Unknown error" },
      { status: 500 }
    );
  }
}