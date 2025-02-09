import SchoolType from './SchoolType'

export default async function OfertaEdukacyjna({ school }) {
  console.log(school.rodzaje_szkoly.technikum?.lista_kierunkow)
  return (
    <div className='p-4 flex flex-col justify-center items-center gap-20'>
      {school.rodzaje_szkoly.liceum?.lista_kierunkow.length !== 0 && (
        <SchoolType
          school={school}
          schoolDescription={school.rodzaje_szkoly.liceum?.opis}
          listaKierunkow={school.rodzaje_szkoly.liceum?.lista_kierunkow}
          typ='Liceum'
        />
      )}
      {school.rodzaje_szkoly.technikum?.lista_kierunkow.length !== 0 && (
        <SchoolType
          school={school}
          schoolDescription={school.rodzaje_szkoly.technikum?.opis}
          listaKierunkow={school.rodzaje_szkoly.technikum?.lista_kierunkow}
          typ='Technikum'
        />
      )}
      {school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow.length !== 0 && (
        <SchoolType
          school={school}
          schoolDescription={school.rodzaje_szkoly.szkola_zawodowa?.opis}
          listaKierunkow={school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow}
          typ='Szkoła Zawodowa'
        />
      )}
    </div>
  )
}
