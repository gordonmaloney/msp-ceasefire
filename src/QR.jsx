import React from "react";
import QRCode from "react-qr-code";
import { useRef, useEffect, useState } from "react";

export const QR = ({ link }) => {
  const qrRef = useRef();
  const img = qrRef;

  const [imgPath, setImgPath] = useState("");
  useEffect(() => {
    if (qrRef.current) {
      const svgAsXML = (new XMLSerializer()).serializeToString(qrRef.current)
      console.log(svgAsXML)
      const svgData = `data:image/svg+xml,${encodeURIComponent(svgAsXML)}`
      setImgPath(svgData)
    }
  }, [qrRef]);


  return (
    <>
      <div style={{display: 'none'}}>
      <QRCode value={link} ref={qrRef} />
      </div>
      <img src={imgPath} />
    </>
  );
};
