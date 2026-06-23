import { QRCodeSVG } from "qrcode.react";

function MenuQR() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Scan To View Menu</h2>

      <QRCodeSVG value="http://192.168.0.5:5173/menu-card" size={250} />

      <p>WAFF N BURG</p>
    </div>
  );
}

export default MenuQR;
