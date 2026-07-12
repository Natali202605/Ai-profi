import { revalidatePath } from "next/cache";

const DEFAULT_PATHS = ["/", "/portfolio", "/reviews/new"];

export function revalidatePublicSite(extraPaths: string[] = []) {
  const paths = new Set([...DEFAULT_PATHS, ...extraPaths]);
  for (const path of paths) {
    revalidatePath(path);
  }
}
