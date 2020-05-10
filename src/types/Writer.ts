import { Page } from "./Page";

export interface Writer {
  id?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  tokenVersion?: string | null;
  settings?: {
    minimalizm: string | null;
    timeLimit: string | null;
  };
  pages?: Page[] | null;
}
