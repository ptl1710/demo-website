import { NextResponse } from "next/server";
import { getOtpStore } from "../send-otp/route";

export async function POST(req: Request) {
  const { phone, otp } = await req.json();

  if (!phone || !otp) {
    return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
  }

  const otpStore = getOtpStore();
  const validOtp = otpStore[phone];

  if (validOtp && validOtp === otp) {
    delete otpStore[phone];
    return NextResponse.json({ success: true, message: "Đăng nhập thành công" });
  } else {
    return NextResponse.json({ success: false, error: "OTP không hợp lệ" }, { status: 400 });
  }
}
