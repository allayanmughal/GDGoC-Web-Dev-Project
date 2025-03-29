import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const navbarStyle = {
    backgroundColor: "rgba(10, 25, 47, 0.9)",
    padding: "20px 0",
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(100, 255, 218, 0.2)",
    boxShadow: "0 10px 30px -10px rgba(2, 12, 27, 0.7)",
  };

  const logoStyle = {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#64ffda",
    position: "absolute",
    left: "40px",
    textShadow: "0 0 10px rgba(100, 255, 218, 0.3)",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const linkContainerStyle = {
    display: "flex",
    gap: "30px",
  };

  const linkStyle = {
    color: "#ccd6f6",
    textDecoration: "none",
    padding: "12px 25px",
    borderRadius: "4px",
    transition: "all 0.3s ease",
    fontWeight: "500",
    fontSize: "16px",
    letterSpacing: "0.5px",
    position: "relative",
    overflow: "hidden",
  };

  const activeLinkStyle = {
    color: "#64ffda",
    transform: "translateY(-2px)",
  };

  const hoverEffect = {
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px",
      backgroundColor: "#64ffda",
      transform: "scaleX(0)",
      transformOrigin: "right",
      transition: "transform 0.3s ease",
    },
    "&:hover:before": {
      transform: "scaleX(1)",
      transformOrigin: "left",
    },
    "&:hover": {
      color: "#64ffda",
    },
  };

  const logoIconStyle = {
    width: "30px",
    height: "30px",
    background: "linear-gradient(135deg, #64ffda 0%, #1e3a8a 100%)",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 0 10px rgba(100, 255, 218, 0.5)"
  };

  return (
    <nav style={navbarStyle}>
      <h1 style={logoStyle}>
        <span style={logoIconStyle}>📚</span>
        Book Nexus
      </h1>

      <div style={linkContainerStyle}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeLinkStyle : {}),
            "&:before": hoverEffect["&:before"],
            "&:hover:before": hoverEffect["&:hover:before"],
            "&:hover": hoverEffect["&:hover"],
          })}
        >
          <span style={{ position: "relative", zIndex: 1 }}>Home</span>
        </NavLink>
        <NavLink
          to="/search"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeLinkStyle : {}),
            "&:before": hoverEffect["&:before"],
            "&:hover:before": hoverEffect["&:hover:before"],
            "&:hover": hoverEffect["&:hover"],
          })}
        >
          <span style={{ position: "relative", zIndex: 1 }}>Search</span>
        </NavLink>
        <NavLink
          to="/favorites"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeLinkStyle : {}),
            "&:before": hoverEffect["&:before"],
            "&:hover:before": hoverEffect["&:hover:before"],
            "&:hover": hoverEffect["&:hover"],
          })}
        >
          <span style={{ position: "relative", zIndex: 1 }}>Favorites</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;