import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest,NextResponse } from "next/server";


export async function GET