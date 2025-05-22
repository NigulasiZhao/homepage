import { DateTime } from "luxon";
import { useEffect } from "react";

import useWidgetAPI from "../../../utils/proxy/use-widget-api";
import Error from "../../../components/services/widget/error";

export default function Integration({ config, params, setEvents, hideErrors = false }) {
  const { data: gogsData, error: gogsError } = useWidgetAPI(config, "calendar", {
    ...params,
    ...(config?.params ?? {}),
  });

  useEffect(() => {
    if (!gogsData || gogsError) {
      return;
    }

    const eventsToAdd = {};

    gogsData?.forEach((event) => {
      const title = `${event.title} - ${event.rownum}`;

      eventsToAdd[title] = {
        title: `${event.title}`,
        date: DateTime.fromISO(event.airDateUtc),
        color: event?.color ?? "teal",
        isCompleted: event.hasFile,
        additional: `${event.message}`,
      };
    });

    setEvents((prevEvents) => ({ ...prevEvents, ...eventsToAdd }));
  }, [gogsData, gogsError, config, setEvents]);

  const error = gogsError ?? gogsData?.error;
  return error && !hideErrors && <Error error={{ message: `${config.type}: ${error.message ?? error}` }} />;
}
