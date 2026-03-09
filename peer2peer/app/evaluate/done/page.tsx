"use client";

export default function EvaluationDonePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "'Geist', 'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#fff",
          borderRadius: 20,
          padding: "48px 32px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
          textAlign: "center",
        }}
      >
        {/* Checkmark circle */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#dcfce7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: 36,
          }}
        >
          ✅
        </div>

        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#111827",
            marginBottom: 10,
          }}
        >
          Evaluation Submitted!
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: 15,
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Thank you for completing your peer evaluation.
          Your responses have been recorded and will remain anonymous.
        </p>

        <div
          style={{
            background: "#f8fafc",
            borderRadius: 12,
            padding: "16px 20px",
            fontSize: 13,
            color: "#6b7280",
            lineHeight: 1.7,
          }}
        >
          You can now close this tab. If you believe you submitted by mistake,
          please contact your instructor.
        </div>
      </div>
    </div>
  );
}