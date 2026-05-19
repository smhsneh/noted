import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Board from "../../../models/Board";

// GET board
export async function GET() {
  try {
    await connectDB();

    let board = await Board.findOne();

    // create empty board if none exists
    if (!board) {
      board = await Board.create({
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
      { status: 500 }
    );
  }
}

// SAVE board
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    let board = await Board.findOne();

    if (!board) {
      board = await Board.create(body);
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
      { status: 500 }
    );
  }
}