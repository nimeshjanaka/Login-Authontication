// import { NextResponse, NextRequest } from "next/server";
// import { connectToDatabase } from "../../../../../lib/mongodb";

// export async function POST(req, res) {
//   try {
//     const { email } = req.body;
//     const { db } = await connectToDatabase();

//     const user = await db.collection("users").findOne({ email });
//     if (user) {
//       res.status(200).json({ user: true });
//     } else {
//       res.status(200).json({ user: false });
//     }
//   } catch (error) {
//     console.error("Error accessing the database or finding user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    const { email } = req.body;
    const { db } = await connectToDatabase();

    const user = await db.collection("users").findOne({ email });
    if (user) {
      // res.status(200).json({ user: true });
      return NextResponse.json({ user: true, status: 200 });
    } else {
      return NextResponse.json({ user: true, status: 200 });
    }
  } catch (error) {
    console.error("Error accessing the database or finding user:", error);
    // res.status(500).json({ error: "Internal Server Error" });
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
