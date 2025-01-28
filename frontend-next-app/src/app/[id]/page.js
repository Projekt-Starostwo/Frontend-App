// strona poswicona szkole, najlepiej server component, chyba ze jakies guziki to wtedy mniejsze client componenty
// po id szkoly pobrac o niej dane

import { getSchoolInfo } from "@/lib/queries";

export default async function Page({ params }) {
  const { id } = await params;
  const mockId = "pzzb5d02ypz9rv19lb4mszys";
  // const schoolInfo = await getSchoolInfo(id);
  const schoolInfo = await getSchoolInfo(mockId);

  return (
    <div>
      <h1>schoolInfo?.name</h1>
      <h1>School ID: {schoolInfo?.id}</h1>
    </div>
  );
}
