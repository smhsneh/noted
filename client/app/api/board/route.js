import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { connectDB } from "../../../lib/mongodb";

import Board from "../../../models/Board";
import Session from "../../../models/Session";

import { COOKIE_NAME } from "../../../lib/auth/cookies";

// GET board
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get(COOKIE_NAME)?.value;

    if (!sessionToken) {
      return NextResponse.json(
        {
          error: "unauthorized",
        },
        { status: 401 },
      );
    }

    const session = await Session.findOne({
      sessionToken,
    });

    if (!session) {
      return NextResponse.json(
        {
          error: "invalid session",
        },
        { status: 401 },
      );
    }

    if (session.expiresAt < new Date()) {
      await Session.deleteOne({
        _id: session._id,
      });

      return NextResponse.json(
        {
          error: "session expired",
        },
        { status: 401 },
      );
    }

    let board = await Board.findOne({
      userId: session.userId,
    });

    // create empty board if none exists
    if (!board) {
      board = await Board.create({
        userId: session.userId,
        notes: [],
        stickers: [],
        cameraX: 0,
        cameraY: 0,
        zoom: 1,
      });
    }

    return NextResponse.json(board);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "failed to fetch board" },
      { status: 500 },
    );
  }
}

// SAVE board
export async function POST(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get(COOKIE_NAME)?.value;

    if (!sessionToken) {
      return NextResponse.json(
        {
          error: "unauthorized",
        },
        { status: 401 },
      );
    }

    const session = await Session.findOne({
      sessionToken,
    });

    if (!session) {
      return NextResponse.json(
        {
          error: "invalid session",
        },
        { status: 401 },
      );
    }

    if (session.expiresAt < new Date()) {
      await Session.deleteOne({
        _id: session._id,
      });

      return NextResponse.json(
        {
          error: "session expired",
        },
        { status: 401 },
      );
    }

    const body = await req.json();

    let board = await Board.findOne({
      userId: session.userId,
    });

    if (!board) {
      board = await Board.create({
        userId: session.userId,
        notes: body.notes || [],
        stickers: body.stickers || [],
        cameraX: body.cameraX || 0,
        cameraY: body.cameraY || 0,
        zoom: body.zoom || 1,
      });
    } else {
      board.notes = body.notes;
      board.stickers = body.stickers;
      board.cameraX = body.cameraX;
      board.cameraY = body.cameraY;
      board.zoom = body.zoom;

      await board.save();
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "failed to save board" },
      { status: 500 },
    );
  }
}