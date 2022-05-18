// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';

export default function middleware(req) {
  const token = req.cookies?.ADMIN_ACCESSTOKEN;
  console.log(token);
  return NextResponse.next();
}
