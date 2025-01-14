import { readdirSync, readFileSync } from "node:fs";
import path from "path";

export const getAllDapps = async (): Promise<
  (DappInfo & { url: string })[]
> => {
  const dappsDirectory = path.join(process.cwd(), "data");
  const filenames = readdirSync(dappsDirectory);

  const paths = filenames
    .filter((filename) => filename.endsWith(".json"))
    .map((filename) => filename.replace(/\.json$/, ""));

  const dapps: (DappInfo & { url: string })[] = [];

  for (const el of paths) {
    const dappFile = path.join(dappsDirectory, `${el}.json`);
    const content = readFileSync(dappFile, { encoding: "utf8" }).toString();

    if (content) {
      try {
        const parsedContent = JSON.parse(content);

        // Remplacer les valeurs indéfinies par des valeurs par défaut
        dapps.push({
          ...parsedContent,
          audits: parsedContent.audits || [], // Définit un tableau vide si undefined
          contracts: parsedContent.contracts || [], // Définit un tableau vide si undefined
          tokens: parsedContent.tokens || [], // Définit un tableau vide si undefined
          url: `${el.toLowerCase()}`,
        });
      } catch (error) {
        console.error(`Erreur dans le fichier JSON ${el}.json :`, error);
        throw error;
      }
    }
  }

  return dapps;
};
