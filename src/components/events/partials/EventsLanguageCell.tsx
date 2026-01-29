import { loadEventsIntoTable } from "../../../thunks/tableThunks";
import { fetchEvents } from "../../../slices/eventSlice";
import { Event } from "../../../slices/eventSlice";
import FilterCell from "../../shared/FilterCell";
import { useTranslation } from "react-i18next";
import { ParseKeys } from "i18next";

/**
 * This component renders the language cells of events in the table view
 */
const EventsLanguageCell = ({
	row,
}: {
	row: Event
}) => {
	const { t } = useTranslation();

	return (
		<>
			{ row.language &&
				<FilterCell
					resource={"events"}
					filterName={"language"}
					filterItems={[{
						filterValue: row.language,
						children: t(row.language_translation_key as ParseKeys),
						// cellTooltipText: "EVENTS.EVENTS.TABLE.TOOLTIP.LANGUAGE", // Disabled due to performance concerns
					}]}
					fetchResource={fetchEvents}
					loadResourceIntoTable={loadEventsIntoTable}
				/>
			}
		</>
	);
};

export default EventsLanguageCell;
