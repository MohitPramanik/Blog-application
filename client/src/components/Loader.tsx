export default function Loader() {

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-white overflow-hidden position-relative"
    >
      {/* Floating Background Circles */}
      <div className="loader-bg-circle loader-bg-circle-1"></div>
      <div className="loader-bg-circle loader-bg-circle-2"></div>
      <div className="loader-bg-circle loader-bg-circle-3"></div>

      {/* Main Loader */}
      <div className="loader-wrapper position-relative d-flex align-items-center justify-content-center">
        <div className="loader-ring loader-ring-1"></div>
        <div className="loader-ring loader-ring-2"></div>
        <div className="loader-ring loader-ring-3"></div>

        <div className="loader-center d-flex align-items-center justify-content-center">
          <span className="fw-bold text-dark fs-4">B</span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-5 text-center">
        <h4 className="fw-bold text-dark mb-2">Loading your experience</h4>

        <div className="loading-dots d-flex justify-content-center align-items-center gap-2">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <style>
        {`
          .loader-wrapper {
            width: 180px;
            height: 180px;
          }

          .loader-ring {
            position: absolute;
            border-radius: 50%;
            border-style: solid;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          .loader-ring-1 {
            width: 180px;
            height: 180px;
            border-width: 6px;
            border-color: #212529 transparent transparent transparent;
            animation: spinClockwise 2s infinite;
          }

          .loader-ring-2 {
            width: 130px;
            height: 130px;
            border-width: 6px;
            border-color: transparent #6c757d transparent transparent;
            animation: spinCounter 1.5s infinite;
          }

          .loader-ring-3 {
            width: 80px;
            height: 80px;
            border-width: 5px;
            border-color: transparent transparent #adb5bd transparent;
            animation: spinClockwise 1s infinite;
          }

          .loader-center {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
            z-index: 10;
            animation: pulse 2s infinite ease-in-out;
          }

          .loading-dots span {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #212529;
            display: inline-block;
            animation: bounce 1.4s infinite ease-in-out both;
          }

          .loading-dots span:nth-child(1) {
            animation-delay: -0.32s;
          }

          .loading-dots span:nth-child(2) {
            animation-delay: -0.16s;
          }

          .loader-bg-circle {
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.03);
            animation: float 8s infinite ease-in-out;
          }

          .loader-bg-circle-1 {
            width: 220px;
            height: 220px;
            top: 10%;
            left: 8%;
          }

          .loader-bg-circle-2 {
            width: 150px;
            height: 150px;
            bottom: 15%;
            right: 10%;
            animation-delay: 2s;
          }

          .loader-bg-circle-3 {
            width: 100px;
            height: 100px;
            top: 25%;
            right: 20%;
            animation-delay: 4s;
          }

          @keyframes spinClockwise {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes spinCounter {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }

          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.12);
            }
          }

          @keyframes bounce {
            0%,
            80%,
            100% {
              transform: scale(0);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @media (max-width: 576px) {
            .loader-wrapper {
              width: 140px;
              height: 140px;
            }

            .loader-ring-1 {
              width: 140px;
              height: 140px;
            }

            .loader-ring-2 {
              width: 100px;
              height: 100px;
            }

            .loader-ring-3 {
              width: 65px;
              height: 65px;
            }
          }
        `}
      </style>
    </div>
  );
}
