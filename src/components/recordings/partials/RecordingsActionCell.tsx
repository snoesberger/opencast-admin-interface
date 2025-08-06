import { useRef } from "react";
import { useAppDispatch } from "../../../store";
import { Recording, deleteRecording } from "../../../slices/recordingSlice";
import { fetchRecordingDetails } from "../../../slices/recordingDetailsSlice";
import { ActionCellDelete } from "../../shared/ActionCellDelete";
import { ModalHandle } from "../../shared/modals/Modal";
import RecordingDetailsModal from "./modal/RecordingDetailsModal";
import ButtonLikeAnchor from "../../shared/ButtonLikeAnchor";

/**
 * This component renders the action cells of recordings in the table view
 */
const RecordingsActionCell = ({
	row,
}: {
	row: Recording
}) => {
	const dispatch = useAppDispatch();

	const recordingDetailsModalRef = useRef<ModalHandle>(null);

	const showRecordingDetails = async () => {
		await dispatch(fetchRecordingDetails(row.name));

		recordingDetailsModalRef.current?.open();
	};

	const deletingRecording = (id: string) => {
		dispatch(deleteRecording(id));
	};

	return (
		<>
			{/* view details location/recording */}
			<ButtonLikeAnchor
				onClick={() => showRecordingDetails()}
				className={"more"}
				editAccessRole={"ROLE_UI_LOCATIONS_DETAILS_VIEW"}
				tooltipText={"RECORDINGS.RECORDINGS.TABLE.TOOLTIP.DETAILS"}
			/>

			<RecordingDetailsModal
				recordingId={row.name}
				modalRef={recordingDetailsModalRef}
			/>

			{/* delete location/recording */}
			<ActionCellDelete
				editAccessRole={"ROLE_UI_LOCATIONS_DELETE"}
				tooltipText={"RECORDINGS.RECORDINGS.TABLE.TOOLTIP.DELETE"}
				resourceId={row.name}
				resourceName={row.name}
				resourceType={"LOCATION"}
				deleteMethod={deletingRecording}
			/>
		</>
	);
};

export default RecordingsActionCell;
