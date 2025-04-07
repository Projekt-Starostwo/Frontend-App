import { Clock9, Mail, MapPinned, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <div className='h-full w-full border-t p-10 flex flex-col items-center gap-8 justify-center'>
      <h1 className='font-bold text-center'>Starostwo Powiatowe w Mińsku Mazowieckim</h1>

      <div className='w-full h-full flex flex-col md:flex-row flex-wrap justify-center  items-start max-sm:justify-center max-sm:items-center gap-10'>
        <div className='w-4/5 md:w-auto flex flex-row items-center justify-center gap-6'>
          <div className='w-1/6'>
            <MapPinned size={40} />
          </div>
          <div className='flex flex-col w-5/6'>
            <p>ul. T.Kościuszki 3 05-300</p>
            <p>Mińsk Mazowiecki</p>
          </div>
        </div>
        <div className='w-4/5 md:w-auto flex flex-row items-center justify-center gap-6'>
          <div className='w-1/6'>
            <Phone size={40} />
          </div>
          <div className='flex flex-col w-5/6'>
            {/* <p>Tel. 25/ 759 87 00 </p>
            <p>Fax. 25/ 759 87 0</p> */}
            <p>Biuro Obsługi Interesanta</p>
            <p>Tel. 25 759 87 11</p>
          </div>
        </div>
        <div className='w-4/5 md:w-auto flex flex-row items-center justify-center gap-6'>
          <div className='w-1/6'>
            <Mail size={40} />
          </div>
          <div className='flex flex-col w-5/6 '>
            <p className=''>boi@powiatminski.pl</p>
          </div>
        </div>
        <div className='w-4/5 md:w-auto flex flex-row items-start justify-center gap-6'>
          <div className='w-1/6'>
            <Clock9 size={40} />
          </div>
          <div className='flex flex-col w-5/6 '>
            <div className='flex flex-row justify-between items-center'>
              <p className='pr-1'>Pon, Wt, Czw </p>
              <p> 8:00-16:00</p>
            </div>
            <div className='flex flex-row justify-between items-center'>
              <p>Środa</p>
              <p>8:00-17:00</p>
            </div>
            <div className='flex flex-row justify-between items-center'>
              <p>Piątek</p>
              <p>8:00-15:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
