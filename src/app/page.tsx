import RedocsReader from "@/components/RedocsReader";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import yaml from "yaml";
import fs from "fs";
import { specURL } from "@/constants/urls";

async function getSpec(name: string) {
  const path = `${specURL}${name}`;
  const req = await fetch(path);
  const data = await req.text();
  return yaml.parse(data);
}

export default async function Home({ searchParams }: any) {
  const spec = searchParams.spec;

  if (!spec) {
    return <LandingPage />;
  }
  const specData = await getSpec(spec);

  return <RedocsReader spec={specData} />;
}

function LandingPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <div className="">
            <a href="#" className="inline-flex space-x-6 pb-4">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                Metopia API 文档
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>当前版本 v1.0</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            对接Metopia各项服务的API文档
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            为了方便开发者对Metopia平台进行接入，
            Metopia提供了完善的API文档，开发者可以通过API文档了解Metopia平台的各项服务及其使用方法，
            开发者可以根据自己的需求调用相应的API接口，
            实现对Metopia平台的各项服务的调用。
          </p>
        </div>
        <div className="mx-auto flex max-w-2xl lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 h-80">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
              <Image
                src="/images/product.png"
                alt="App screenshot"
                width={1000}
                height={1000}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
