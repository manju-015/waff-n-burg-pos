import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ReceiptPage() {
  const { state } = useLocation();

  console.log("RECEIPT STATE:", state);

  useEffect(() => {
    window.print();
  }, []);

  if (!state) {
    return <div>No Bill Found</div>;
  }

  const { items, total } = state;

  return (
    <div
      className="
      receipt
      mx-auto
      bg-white
      p-5
      w-[80mm]
      text-sm
      "
    >
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">WAFF N BURG</h1>

        <p>Waffles • Burgers • Shakes</p>

        <p>{new Date().toLocaleString()}</p>

        <p>Bill #{state.billNumber}</p>
      </div>
      <hr className="my-3" />

      <div className="border-t border-b py-3">
        {items.map((item) => (
          <div key={item._id} className="flex justify-between py-1">
            <div>
              {item.name} ({item.base} Base)x {item.qty}
            </div>

            <div>₹{item.price * item.qty}</div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>

          <span>₹{total}</span>
        </div>
      </div>
      <div className="text-center mt-5 text-xs">
        <p>Thank You For Visiting</p>

        <p>Visit Again ❤️</p>
      </div>

      <button
        onClick={() => window.print()}
        className="
        print:hidden
        mt-4
        w-full
        bg-black
        text-white
        py-2
        rounded
        "
      >
        Print Receipt
      </button>
      <style>
        {`
        @media print {

          @page {
            size: 80mm auto;
            margin: 0;
          }


          body * {
            visibility: hidden;
          }


          .receipt,
          .receipt * {
            visibility: visible;
          }


          .receipt {
            position: absolute;
            left:0;
            top:0;
          }

        }
        `}
      </style>
    </div>
  );
}

export default ReceiptPage;
