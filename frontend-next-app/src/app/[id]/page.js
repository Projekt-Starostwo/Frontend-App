// strona poswicona szkole, najlepiej server component, chyba ze jakies guziki to wtedy mniejsze client componenty
// po id szkoly pobrac o niej dane
export default function Page({ params }) {
  return <div>Hello, {params.id}!</div>
}
