import React from "react";

const Topbar = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", background: "#fff", borderBottom: "1px solid #ddd" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>Admin Booking Management</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{cursor:"pointer"}}>🔔</span>
        <span>👤</span>
      </div>
    </div>
  );
};

export default Topbar;
