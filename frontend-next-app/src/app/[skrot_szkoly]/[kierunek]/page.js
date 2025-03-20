import { Suspense } from "react";
import KierunekPage from "./KierunekPage";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page({ params }) {
  return (
    <>
      {/* <KierunekPageLoading /> */}
      <Suspense fallback={<KierunekPageLoading />}>
        <KierunekPage params={params} />
      </Suspense>
    </>
  );
}
function KierunekPageLoading() {
  return (
    <div className="h-auto w-full flex flex-col justify-start items-center p-10 ">
      <div className="h-full w-2/3 ">
        <div className="h-auto w-full  flex flex-col justify-start items-center  p-10">
          {/* header */}
          <div className="h-full w-2/3">
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
          {/* opis */}
          <div className="h-1/2 w-2/3 flex items-start justify-start flex-col py-10">
            <Skeleton className="h-10 w-1/3  rounded-xl" />
            <div className="py-4 w-full flex flex-col gap-4">
              <Skeleton className="h-10 w-full  rounded-xl" />
              <Skeleton className="h-10 w-full  rounded-xl" />
            </div>
          </div>
          <div className="h-1/2 w-2/3 flex items-start justify-start flex-col">
            <div className="w-full flex flex-col gap-4">
              <Skeleton className="h-10 w-1/3  rounded-xl" />
              <Skeleton className="h-10 w-full  rounded-xl" />
              <Skeleton className="h-10 w-full  rounded-xl" />
              <Skeleton className="h-10 w-2/3  rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
