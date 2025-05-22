import { DateTime } from "luxon";
import { useEffect } from "react";

import useWidgetAPI from "../../../utils/proxy/use-widget-api";
import Error from "../../../components/services/widget/error";

export default function Integration({ config, params, setEvents, hideErrors = false }) {
  const { data: yinuoData, error: yinuoError } = useWidgetAPI(config, "calendar", {
    ...params,
    ...(config?.params ?? {}),
  });

  useEffect(() => {
    if (!yinuoData || yinuoError) {
      return;
    }

    const eventsToAdd = {};

    yinuoData?.forEach((event) => {
      const title = `${event.title} - ${event.rownum}`;

      eventsToAdd[title] = {
        title: `${event.title}`,
        date: DateTime.fromISO(event.airDateUtc),
        color: config?.color ?? "teal",
        isCompleted: event.hasFile,
        additional: `${event.message}`,
      };
    });

    setEvents((prevEvents) => ({ ...prevEvents, ...eventsToAdd }));
  }, [yinuoData, yinuoError, config, setEvents]);

  const error = yinuoError ?? yinuoData?.error;
  return error && !hideErrors && <Error error={{ message: `${config.type}: ${error.message ?? error}` }} />;
}
