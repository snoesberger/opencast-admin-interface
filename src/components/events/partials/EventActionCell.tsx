import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import EmbeddingCodeModal from "./modals/EmbeddingCodeModal";
import { getUserInformation } from "../../../selectors/userInfoSelectors";
import { hasAccess } from "../../../utils/utils";
import { EventDetailsPage } from "./modals/EventDetails";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
	fetchSeriesDetailsAcls,
	fetchSeriesDetailsMetadata,
	fetchSeriesDetailsTheme,
	fetchSeriesDetailsThemeNames,
	openModal as openSeriesModal,
} from "../../../slices/seriesDetailsSlice";
import { Event, deleteEvent } from "../../../slices/eventSlice";
import { Tooltip } from "../../shared/Tooltip";
import { openModal } from "../../../slices/eventDetailsSlice";
import { ActionCellDelete } from "../../shared/ActionCellDelete";
import { Modal, ModalHandle } from "../../shared/modals/Modal";
import ButtonLikeAnchor from "../../shared/ButtonLikeAnchor";
import { SeriesDetailsPage } from "./modals/SeriesDetails";

/**
 * This component renders the action cells of events in the table view
 */
const EventActionCell = ({
	row,
}: {
	row: Event
}) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const embeddingCodeModalRef = useRef<ModalHandle>(null);

	const user = useAppSelector(state => getUserInformation(state));

	const deletingEvent = (id: string) => {
		dispatch(deleteEvent(id));
	};

	const hideEmbeddingCodeModal = () => {
		embeddingCodeModalRef.current?.close?.();
	};

	const showEmbeddingCodeModal = () => {
		embeddingCodeModalRef.current?.open();
	};

	const showSeriesDetailsModal = () => {
		dispatch(openSeriesModal(SeriesDetailsPage.Metadata, row.series ? row.series : null));
	};

	const onClickSeriesDetails = async () => {
		if (row.series) {
			await Promise.all([
				dispatch(fetchSeriesDetailsMetadata(row.series.id)),
				dispatch(fetchSeriesDetailsAcls(row.series.id)),
				dispatch(fetchSeriesDetailsTheme(row.series.id)),
				dispatch(fetchSeriesDetailsThemeNames()),
			]);

			showSeriesDetailsModal();
		}
	};

	const onClickEventDetails = () => {
		dispatch(openModal(EventDetailsPage.Metadata, row));
	};

	const onClickComments = () => {
		dispatch(openModal(EventDetailsPage.Comments, row));
	};

	const onClickWorkflow = () => {
		dispatch(openModal(EventDetailsPage.Workflow, row));
	};

	const onClickAssets = () => {
		dispatch(openModal(EventDetailsPage.Assets, row));
	};

	return (
		<>
			{/* Open event details */}
			<ButtonLikeAnchor
				onClick={onClickEventDetails}
				className={"more"}
				editAccessRole={"ROLE_UI_EVENTS_DETAILS_VIEW"}
				// tooltipText={"EVENTS.EVENTS.TABLE.TOOLTIP.DETAILS"} // Disabled due to performance concerns
			/>

			{/* If event belongs to a series then the corresponding series details can be opened */}
			{!!row.series && (
				<ButtonLikeAnchor
					onClick={onClickSeriesDetails}
					className={"more-series"}
					editAccessRole={"ROLE_UI_SERIES_DETAILS_VIEW"}
					// tooltipText={"EVENTS.SERIES.TABLE.TOOLTIP.DETAILS"} // Disabled due to performance concerns
				/>
			)}

			{/* Delete an event */}
			<ActionCellDelete
				editAccessRole={"ROLE_UI_EVENTS_DELETE"}
				// tooltipText={"EVENTS.EVENTS.TABLE.TOOLTIP.DELETE"} // Disabled due to performance concerns
				resourceId={row.id}
				resourceName={row.title}
				resourceType={"EVENT"}
				deleteMethod={deletingEvent}
			/>

			{/* If the event has an preview then the editor can be opened and status if it needs to be cut is shown */}
			{!!row.has_preview && hasAccess("ROLE_UI_EVENTS_EDITOR_VIEW", user) && (
				// <Tooltip // Disabled due to performance concerns
				// 	title={
				// 		row.needs_cutting
				// 			? t("EVENTS.EVENTS.TABLE.TOOLTIP.EDITOR_NEEDS_CUTTING")
				// 			: t("EVENTS.EVENTS.TABLE.TOOLTIP.EDITOR")
				// 	}
				// >
					<a
						href={`/editor-ui/index.html?id=${row.id}`}
						className="cut"
						target="_blank" rel="noreferrer"
					>
						{row.needs_cutting && <span id="badge" className="badge" />}
					</a>
				// </Tooltip>
			)}

			{/* If the event has comments and no open comments then the comment tab of event details can be opened directly */}
			{row.has_comments && !row.has_open_comments && (
				<ButtonLikeAnchor
					onClick={() => onClickComments()}
					className={"comments"}
					// tooltipText={"EVENTS.EVENTS.TABLE.TOOLTIP.COMMENTS"} // Disabled due to performance concerns
				/>
			)}

			{/* If the event has comments and open comments then the comment tab of event details can be opened directly */}
			{row.has_comments && row.has_open_comments && (
				<ButtonLikeAnchor
					onClick={() => onClickComments()}
					className={"comments-open"}
					// tooltipText={"EVENTS.EVENTS.TABLE.TOOLTIP.COMMENTS"} // Disabled due to performance concerns
				/>
			)}

			{/*If the event is in in a paused workflow state then a warning icon is shown and workflow tab of event
				details can be opened directly */}
			{row.workflow_state === "PAUSED" &&
				<ButtonLikeAnchor
					onClick={() => onClickWorkflow()}
					className={"fa fa-warning"}
					editAccessRole={"ROLE_UI_EVENTS_DETAILS_WORKFLOWS_EDIT"}
					// tooltipText={"EVENTS.EVENTS.TABLE.TOOLTIP.PAUSED_WORKFLOW"} // Disabled due to performance concerns
				/>
			}

			{/* Open assets tab of event details directly*/}
			<ButtonLikeAnchor
				onClick={() => onClickAssets()}
				className={"fa fa-folder-open"}
				editAccessRole={"ROLE_UI_EVENTS_DETAILS_ASSETS_VIEW"}
				// tooltipText={"EVENTS.EVENTS.TABLE.TOOLTIP.ASSETS"} // Disabled due to performance concerns
			/>

			{/* Open dialog for embedded code*/}
			<ButtonLikeAnchor
				onClick={() => showEmbeddingCodeModal()}
				className={"fa fa-link"}
				editAccessRole={"ROLE_UI_EVENTS_EMBEDDING_CODE_VIEW"}
				// tooltipText={"EVENTS.EVENTS.TABLE.TOOLTIP.EMBEDDING_CODE"} // Disabled due to performance concerns
			/>

			{/* Embedding Code Modal */}
			<Modal
				header={t("CONFIRMATIONS.ACTIONS.SHOW.EMBEDDING_CODE")}
				classId="embedding-code"
				ref={embeddingCodeModalRef}
			>
				{/* component that manages tabs of theme details modal*/}
				<EmbeddingCodeModal close={hideEmbeddingCodeModal} eventId={row.id} />
			</Modal>
		</>
	);
};

export default EventActionCell;
