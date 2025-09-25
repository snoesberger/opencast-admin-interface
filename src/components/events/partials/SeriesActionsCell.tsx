import React, { useRef } from "react";
import ConfirmModal from "../../shared/ConfirmModal";
import {
	fetchSeriesDetailsThemeNames,
	fetchSeriesDetailsAcls,
	fetchSeriesDetailsMetadata,
	fetchSeriesDetailsTheme,
	fetchSeriesDetailsTobira,
	openModal,
} from "../../../slices/seriesDetailsSlice";
import {
	getSeriesHasEvents,
	isSeriesDeleteAllowed,
} from "../../../selectors/seriesSeletctor";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
	Series,
	checkForEventsDeleteSeriesModal,
	deleteSeries,
} from "../../../slices/seriesSlice";
import { ModalHandle } from "../../shared/modals/Modal";
import ButtonLikeAnchor from "../../shared/ButtonLikeAnchor";
import { SeriesDetailsPage } from "./modals/SeriesDetails";

/**
 * This component renders the action cells of series in the table view
 */
const SeriesActionsCell = ({
	row,
}: {
	row: Series
}) => {
	const dispatch = useAppDispatch();

	const deleteConfirmationModalRef = useRef<ModalHandle>(null);

	const hasEvents = useAppSelector(state => getSeriesHasEvents(state));
	const deleteAllowed = useAppSelector(state => isSeriesDeleteAllowed(state));

	const hideDeleteConfirmation = () => {
		deleteConfirmationModalRef.current?.close?.();
	};

	const showDeleteConfirmation = async () => {
		await dispatch(checkForEventsDeleteSeriesModal(row.id));

		deleteConfirmationModalRef.current?.open();
	};

	const deletingSeries = (id: string) => {
		dispatch(deleteSeries(id));
	};

	const showSeriesDetailsModal = async () => {
		await Promise.all([
			dispatch(fetchSeriesDetailsMetadata(row.id)),
			dispatch(fetchSeriesDetailsAcls(row.id)),
			dispatch(fetchSeriesDetailsTheme(row.id)),
			dispatch(fetchSeriesDetailsThemeNames()),
			dispatch(fetchSeriesDetailsTobira(row.id)),
		]);

		dispatch(openModal(SeriesDetailsPage.Metadata, row));
	};

	return (
		<>
			{/* series details */}
			<ButtonLikeAnchor
				onClick={() => showSeriesDetailsModal()}
				className={"more-series"}
				editAccessRole={"ROLE_UI_SERIES_DETAILS_VIEW"}
				// tooltipText={"EVENTS.SERIES.TABLE.TOOLTIP.DETAILS"} // Disabled due to performance concerns
			/>

			{/* delete series */}
			<ButtonLikeAnchor
				onClick={() => showDeleteConfirmation()}
				className={"remove"}
				editAccessRole={"ROLE_UI_SERIES_DELETE"}
				// tooltipText={"EVENTS.SERIES.TABLE.TOOLTIP.DELETE"} // Disabled due to performance concerns
			/>

			<ConfirmModal
				close={hideDeleteConfirmation}
				resourceName={row.title}
				resourceType="SERIES"
				resourceId={row.id}
				deleteMethod={deletingSeries}
				deleteAllowed={deleteAllowed}
				deleteNotAllowedMessage={
					"CONFIRMATIONS.ERRORS.SERIES_HAS_EVENTS"
				} /* The highlighted series cannot be deleted as they still contain events */
				deleteWithCautionMessage={
					hasEvents ? "CONFIRMATIONS.WARNINGS.SERIES_HAS_EVENTS" : undefined
				} /* This series does contain events. Deleting the series will not delete the events. */
				modalRef={deleteConfirmationModalRef}
			/>
		</>
	);
};

export default SeriesActionsCell;
