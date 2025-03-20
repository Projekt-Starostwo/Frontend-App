import { Clock9, Mail, MapPinned, Phone } from "lucide-react";

export default function Footer() {
  return (
    <div className=" w-full border-t p-10 flex flex-col items-center gap-8 justify-center">
      <h1 className="font-bold text-center">
        Starostwo Powiatowe w Mińsku Mazowieckim
      </h1>

      <div className="w-full flex flex-col md:flex-row flex-wrap justify-around items-start gap-8">
        <div className="w-full md:w-auto flex flex-row items-center gap-4">
          <MapPinned size={40} />
          <div className="flex flex-col text-left">
            <p>ul. T.Kościuszki 3 05-300</p>
            <p>Mińsk Mazowiecki</p>
          </div>
        </div>
        <div className="w-full md:w-auto flex flex-row items-center gap-4">
          <Phone size={40} />
          <div className="flex flex-col text-left">
            <p>Tel. 25/ 759 87 00 </p>
            <p>Fax. 25/ 759 87 0</p>
          </div>
        </div>
        <div className="w-full md:w-auto flex flex-row items-center gap-4">
          <Mail size={40} />
          <p className="text-left">boi@powiatminski.pl</p>
        </div>
        <div className="w-full md:w-auto flex flex-row items-center gap-4">
          <Clock9 size={40} />
          <div className="flex flex-col text-left">
            <div className="flex flex-row justify-between items-center">
              <p>Pon, Wt, Czw</p>
              <p>8:00-16:00</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p>Środa</p>
              <p>8:00-17:00</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p>Piątek</p>
              <p>8:00-15:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
