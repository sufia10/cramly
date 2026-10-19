
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { connected: false, message: "Supabase environment variables are missing." },
      { status: 500 },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json(
      { connected: false, message: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    connected: true,
    message: "Supabase client initialized successfully.",
  });
}
