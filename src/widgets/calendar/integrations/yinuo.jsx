import { DateTime } from "luxon";
import { useEffect } from "react";

import useWidgetAPI from "../../../utils/proxy/use-widget-api";
import Error from "../../../components/services/widget/error";

export default function Integration({ config, params, setEvents, hideErrors = false }) {
  const { data: sonarrData, error: sonarrError } = useWidgetAPI(config, "calendar", {
    ...params,
    ...(config?.params ?? {}),
  });

  useEffect(() => {
    if (!sonarrData || sonarrError) {
      return;
    }

    const eventsToAdd = {};

    sonarrData?.forEach((event) => {
      const title = `${event.title} - ${event.rownum}`;

      eventsToAdd[title] = {
        title: `${event.title}`,
        date: DateTime.fromISO(event.airDateUtc),
        color: config?.color ?? "teal",
        isCompleted: event.hasFile,
        additional: `${event.workhours}`,
      };
    });

    setEvents((prevEvents) => ({ ...prevEvents, ...eventsToAdd }));
  }, [sonarrData, sonarrError, config, setEvents]);

  const error = sonarrError ?? sonarrData?.error;
  return error && !hideErrors && <Error error={{ message: `${config.type}: ${error.message ?? error}` }} />;
}
