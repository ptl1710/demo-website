"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type PhoneInput = { phone: string };
type OtpInput = { otp: string };

export default function AuthSMSForm({ onSuccess }: { onSuccess?: () => void }) {
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phone, setPhone] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PhoneInput>();

    const {
        register: registerOtp,
        handleSubmit: handleOtpSubmit,
        formState: { errors: otpErrors },
    } = useForm<OtpInput>();

    const sendOtp = async (data: PhoneInput) => {
        try {
            const res = await fetch("/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: data.phone }),
            });
            const result = await res.json();
            if (res.ok) {
                setPhone(data.phone);
                setStep("otp");
                alert(result.message + " (OTP: " + result.otp + ")");
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error(error);
            alert("Lỗi khi gửi OTP");
        }
    };
    const verifyOtp = async (data: OtpInput) => {
        try {
            const res = await fetch("/api/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, otp: data.otp }),
            });
            const result = await res.json();
            if (res.ok) {
                alert(result.message);
                if (onSuccess) onSuccess();
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error(error);
            alert("Lỗi khi xác minh OTP");
        }
    };

    return (
        <div
            style={{
                background: "white",
                padding: "2rem",
                borderRadius: "8px",
                width: "400px",
                maxWidth: "90%",
                textAlign: "center",
            }}
        >
            {step === "phone" ? (
                <>
                    <h2>Đăng nhập bằng SMS</h2>
                    <p style={{ fontSize: "14px", marginBottom: "1rem" }}>
                        Nhập số điện thoại bạn đã đăng ký tài khoản, hệ thống sẽ gửi mã OTP
                        để đăng nhập
                    </p>

                    <form onSubmit={handleSubmit(sendOtp)}>
                        <div style={{ marginBottom: "1rem" }}>
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                {...register("phone", {
                                    required: "Vui lòng nhập số điện thoại",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Chỉ được nhập số",
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Số điện thoại phải có 10 số",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Số điện thoại không được quá 10 số",
                                    },
                                })}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "6px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    background: 'transparent',
                                    color: '#000'
                                }}
                            />
                            {errors.phone && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "10px",
                                background: "#22409A",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            GỬI OTP
                        </button>
                    </form>

                    <hr style={{ margin: "1.5rem 0" }} />

                    <p>
                        Chưa có tài khoản?{" "}
                        <a href="#" style={{ color: "#22409A" }}>
                            Đăng ký ngay!
                        </a>
                    </p>
                </>
            ) : (
                <>
                    <h2>Nhập mã OTP</h2>
                    <p style={{ fontSize: "14px", marginBottom: "1rem" }}>
                        Mã OTP đã gửi đến số <b>{phone}</b>
                    </p>

                    <form onSubmit={handleOtpSubmit(verifyOtp)}>
                        <input
                            type="text"
                            {...registerOtp("otp", { required: "Vui lòng nhập mã OTP" })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                marginBottom: "1rem",
                                background: 'transparent',
                                color: '#000'
                            }}
                        />
                        {otpErrors.otp && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {otpErrors.otp.message}
                            </p>
                        )}

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "10px",
                                background: "#22409A",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            XÁC NHẬN
                        </button>
                    </form>

                    <p style={{ marginTop: "1rem" }}>
                        Không nhận được OTP?{" "}
                        <button
                            onClick={() => setStep("phone")}
                            style={{ color: "#22409A", background: "none", border: "none" }}
                        >
                            Gửi lại
                        </button>
                    </p>
                </>
            )}
        </div>
    );
}
