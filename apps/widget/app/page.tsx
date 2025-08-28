"use client";

import { WidgetView } from "@/modules/ui/views/widget-view";
import { use } from "react";

interface Props {
  searchParams: Promise<{
    organizationId: string;
  }>;
}
// http://localhost:3001/?organizationId=1234
// SPA를 위한 디자인 패턴
const Page = ({ searchParams }: Props) => {
  const { organizationId } = use(searchParams);
  return <WidgetView organizationId={organizationId} />;
};
export default Page;
