export default function StatsCard({

  title,

  value,

  icon,

  subtitle,

}) {

  return (

    <div
      className="p-4 h-100"
      style={{
        background:
          "#FFFFFF",

        borderRadius:
          "18px",

        border:
          "1px solid #E5E7EB",

        boxShadow:
          "0 10px 30px rgba(15, 23, 42, 0.04)",

      }}
    >

      <div
        className="d-flex justify-content-between align-items-start"
      >

        <div>

          <p
            className="mb-2"
            style={{
              color:
                "#64748B",

              fontSize:
                "14px",

              fontWeight:
                600,

            }}
          >
            {title}
          </p>


          <h2
            className="fw-bold mb-2"
            style={{
              color:
                "#071A36",
            }}
          >
            {value}
          </h2>


          {subtitle && (

            <small
              style={{
                color:
                  "#94A3B8",
              }}
            >
              {subtitle}
            </small>

          )}

        </div>


        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width:
              "50px",

            height:
              "50px",

            borderRadius:
              "14px",

            background:
              "#EAF4FF",

            color:
              "#0D6EFD",

            fontSize:
              "21px",

          }}
        >
          {icon}
        </div>

      </div>

    </div>

  );

}