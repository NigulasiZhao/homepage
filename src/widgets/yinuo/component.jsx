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
        <Block label="总出勤天数" />
        <Block label="总工作时长" />
        <Block label="日均工作时长" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="出勤总天数" value={t("common.number", { value: data.workDays })} />
      <Block label="工作总时长" value={t("common.number", { value: data.workHours })} />
      <Block label="日均工作时长" value={t("common.number", { value: data.dayAvg })} />
    </Container>
  );
}