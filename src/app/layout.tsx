import SpecPicker from "@/components/SpecPicker";
import { Spec } from "@/types/Spec";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import yaml from "yaml";
import "./globals.css";
import { specURL } from "@/constants/urls";

export const metadata = {
  title: "Metopia APISpec",
  description: "Metopia API文档",
};

const files = ["user_spec.yaml"];
function getSpecs(): Promise<Spec[]> {
  const filePromises = files.map(async (file) => {
    const contentReq = await fetch(specURL + file, {
      next: {
        revalidate: 100,
      },
    });
    const content = await contentReq.text();
    const data = yaml.parse(content);
    const name = file.split("/").pop();

    const href = `/?spec=${name}&type=OpenAPI`;
    return {
      name: data.info.title,
      link: href,
      description: data.info.description,
      type: "OpenAPI",
    };
  });

  return Promise.all(filePromises as any);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const specs = await getSpecs();

  return (
    <html lang="en">
      <body>
        <header className="bg-slate-100">
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
            aria-label="Global"
          >
            <div className="flex items-center gap-x-12">
              <a href="/" className="-m-1.5 p-1.5">
                <Image
                  className="h-8 w-auto"
                  src="/images/logo.png"
                  alt=""
                  height={32}
                  width={32}
                />
              </a>
              <div className="hidden lg:flex lg:gap-x-12"></div>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex">
              <SpecPicker specs={specs} />
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
