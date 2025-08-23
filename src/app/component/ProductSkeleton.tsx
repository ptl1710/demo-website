export default function ProductSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1rem",
                padding: "1rem",
            }}
        >
            {Array.from({ length: count }).map((_, idx) => (
                <div
                    key={idx}
                    style={{
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        padding: "1rem",
                        textAlign: "center",
                        background: "#fff",
                    }}
                >
                    {/* Hình ảnh */}
                    <div
                        style={{
                            width: "100%",
                            height: "150px",
                            background: "#e0e0e0",
                            borderRadius: "4px",
                            marginBottom: "0.5rem",
                            animation: "pulse 1.5s infinite",
                        }}
                    ></div>

                    {/* Tên sản phẩm */}
                    <div
                        style={{
                            width: "80%",
                            height: "16px",
                            background: "#e0e0e0",
                            borderRadius: "4px",
                            margin: "0.5rem auto",
                            animation: "pulse 1.5s infinite",
                        }}
                    ></div>

                    {/* Giá */}
                    <div
                        style={{
                            width: "50%",
                            height: "16px",
                            background: "#e0e0e0",
                            borderRadius: "4px",
                            margin: "0.5rem auto",
                            animation: "pulse 1.5s infinite",
                        }}
                    ></div>

                    {/* Nút */}
                    <div
                        style={{
                            width: "70%",
                            height: "30px",
                            background: "#e0e0e0",
                            borderRadius: "6px",
                            margin: "0.75rem auto 0",
                            animation: "pulse 1.5s infinite",
                        }}
                    ></div>
                </div>
            ))}

            <style jsx>{`
        @keyframes pulse {
          0% {
            background-color: #e0e0e0;
          }
          50% {
            background-color: #f5f5f5;
          }
          100% {
            background-color: #e0e0e0;
          }
        }
      `}</style>
        </div>
    );
}
