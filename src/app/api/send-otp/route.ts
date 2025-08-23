import { NextResponse } from "next/server";

let otpStore: Record<string, string> = {};

export async function POST(req: Request) {
    const { phone } = await req.json();

    if (!phone) {
        return NextResponse.json({ error: "Thiếu số điện thoại" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[phone] = otp;
    console.log("👉 OTP cho", phone, "là:", otp);

    return NextResponse.json({
        message: "OTP đã được gửi (mock)",
        otp,
    });
}

export function getOtpStore() {
    return otpStore;
}
