import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;
  const { data, error } = useWidgetAPI(widget, "info");

  if (error) {
    return <Container service={service} error={error} />;
  }

  if (!data) {
    return (
      <Container service={service}>
        <Block label="提交总数" />
        <Block label="提交天数" />
        <Block label="日均提交次数" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="提交总数" value={t("common.number", { value: data.uniqueCommits })} />
      <Block label="提交天数" value={t("common.number", { value: data.commitDates })} />
      <Block label="日均提交次数" value={t("common.number", { value: data.dayAvg })} />
    </Container>
  );
}