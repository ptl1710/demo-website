export default function LoadingSpinner() {
    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            <div
                style={{
                    border: "4px solid #f3f3f3",
                    borderTop: "4px solid #22409A",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    animation: "spin 1s linear infinite",
                }}
            />
            <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
}
