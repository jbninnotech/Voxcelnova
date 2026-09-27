import {
  NavLink,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

const ManagerSidebar = () => {
  const { logout } =
    useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      icon: "bi-grid",
      path: "/manager/dashboard",
    },
    {
      name: "Employees",
      icon: "bi-people",
      path: "/manager/employees",
    },
    {
      name: "Tasks",
      icon: "bi-list-check",
      path: "/manager/tasks",
    },
    {
      name: "Production",
      icon: "bi-gear-wide-connected",
      path: "/manager/production",
    },
    {
      name: "Orders",
      icon: "bi-cart-check",
      path: "/manager/orders",
    },
    {
      name: "Inventory",
      icon: "bi-boxes",
      path: "/manager/inventory",
    },
    {
      name: "Profile",
      icon: "bi-person",
      path: "/manager/profile",
    },
  ];

  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#10243D",
        color: "#ffffff",
        padding: "25px 15px",
      }}
    >

      <div className="mb-5 px-2">

        <h4 className="fw-bold mb-1">
          VOXCEL NOVA
        </h4>

        <small
          style={{
            color:
              "rgba(255,255,255,0.55)",
          }}
        >
          MANAGER PANEL
        </small>

      </div>

      <div className="flex-grow-1">

        {menuItems.map(
          (item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems:
                  "center",
                gap: "12px",
                textDecoration:
                  "none",
                color:
                  isActive
                    ? "#ffffff"
                    : "rgba(255,255,255,0.65)",
                background:
                  isActive
                    ? "#2A5D88"
                    : "transparent",
                padding:
                  "12px 15px",
                borderRadius:
                  "10px",
                marginBottom:
                  "5px",
              })}
            >
              <i
                className={`bi ${item.icon}`}
              />

              {item.name}

            </NavLink>
          )
        )}

      </div>

      <button
        onClick={logout}
        className="btn btn-outline-light"
      >
        <i className="bi bi-box-arrow-right me-2" />

        Logout

      </button>

    </div>
  );
};

export default ManagerSidebar;