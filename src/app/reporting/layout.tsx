import { ProtectedPage } from "@/features/auth/protected-page";
import { RptContext } from "./rpt-context";
import { AI_NAME } from "@/features/theme/customise";

export const metadata = {
  title: AI_NAME,
  description: AI_NAME,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedPage>
      <RptContext/>
      <div className="flex-1">{children}</div>
    </ProtectedPage>
  );
}
