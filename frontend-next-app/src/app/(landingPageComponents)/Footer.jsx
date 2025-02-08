import { Clock9, Mail, MapPinned, Phone } from 'lucide-react'

export default async function Footer() {
  return (
    <div className='h-45 w-full border-t p-10 flex flex-col justify-center items-center gap-8'>
      <h1 className='font-bold'>Starostwo Powiatowe w Mińsku Mazowieckim</h1>

      <div className='flex flex-row justify-center items-center gap-8'>
        <div className='flex flex-row justify-center items-center gap-4'>
          <MapPinned size={60} />
          <div className='flex flex-col'>
            <p>ul. T.Kościuszki 3 05-300</p>
            <p>Mińsk Mazowiecki</p>
          </div>
        </div>
        <div className='flex flex-row justify-start items-center gap-4'>
          <Phone size={60} />
          <div className='flex flex-col justify-start items-start'>
            <p>Tel. 25/ 759 87 00 </p>
            <p>Fax. 25/ 759 87 0</p>
          </div>
        </div>
        <div className='flex flex-row justify-center items-center gap-4'>
          <Mail size={60} />
          <p>boi@powiatminski.pl</p>
        </div>
        <div className='flex flex-row justify-center items-center gap-4'>
          <Clock9 size={60} />
          <div>
            <div className='w-52 flex flex-row justify-between items-center'>
              <p>Pon, Wt, Czw</p>
              <p>8:00-16:00</p>
            </div>
            <div className='w-52 flex flex-row justify-between items-center'>
              <p>Środa</p>
              <p>8:00-17:00</p>
            </div>
            <div className='w-52 flex flex-row justify-between items-center'>
              <p>Piątek</p>
              <p>8:00-15:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
