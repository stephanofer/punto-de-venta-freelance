import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type Content = {
  title: string;
  description?: string;
};

type Props = {
  title: string;
  icon: ReactNode;
  content: Content;
};

export function BoxInfo({ title, icon, content }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content.title}</div>
        {content.description && (
          <p className="text-xs text-muted-foreground">
            {content.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
