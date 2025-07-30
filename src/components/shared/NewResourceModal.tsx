import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import NewEventWizard from "../events/partials/wizards/NewEventWizard";
import NewSeriesWizard from "../events/partials/wizards/NewSeriesWizard";
import NewThemeWizard from "../configuration/partials/wizard/NewThemeWizard";
import NewAclWizard from "../users/partials/wizard/NewAclWizard";
import NewGroupWizard from "../users/partials/wizard/NewGroupWizard";
import NewUserWizard from "../users/partials/wizard/NewUserWizard";
import { Modal, ModalHandle } from "./modals/Modal";
import { useState } from "react";

/**
 * This component renders the modal for adding new resources
 */
export type NewResource = "events" | "series" | "user" | "group" | "acl" | "themes";

const NewResourceModal = ({
	handleClose,
	resource,
	modalRef,
}: {
	handleClose: () => void,
	resource: "events" | "series" | "user" | "group" | "acl" | "themes"
	modalRef: React.RefObject<ModalHandle | null>
}) => {
	const { t } = useTranslation();
	const [mode, setMode] = useState<"form" | "confirm">("form");
	const [closeRequested, setCloseRequested] = useState(false);

	const close = () => {
		handleClose();
	};

	const onAttemptClose = () => {
  	if (mode === "form" && modalRef.current?.isOpen?.()) {
    setCloseRequested(true);
    return false;  // prevent close, show confirmation modal
  	}
  	if (mode === "confirm") {
    cancelClose();  // go back to form mode
    return true;   // make modal close
  	}
    return true;     // default allow close
	};

	// When closeRequested is set, switch to confirm mode
	useEffect(() => {
		if (closeRequested) {
			setMode("confirm");
			setCloseRequested(false);
		}
	}, [closeRequested]);

 	const confirmClose = () => {
  	modalRef.current?.close?.();
	};
	const cancelClose = () => {
	setMode("form");
	};

	const headerText = () => {
		switch (resource) {
			case "events": return t("EVENTS.EVENTS.NEW.CAPTION");
			case "series": return t("EVENTS.SERIES.NEW.CAPTION");
			case "themes": return t("CONFIGURATION.THEMES.DETAILS.NEWCAPTION");
			case "acl": return t("USERS.ACLS.NEW.CAPTION");
			case "group": return t("USERS.GROUPS.NEW.CAPTION");
			case "user": return t("USERS.USERS.DETAILS.NEWCAPTION");
		}
	};

	return (
		<Modal
			header={mode === "confirm" ? "Confirm Close" : headerText()}
			classId="add-event-modal"
			// initialFocus={"#firstField"}
			ref={modalRef}
			closeCallback={onAttemptClose}
		>
		<div style={{ display: mode === "form" ? "block" : "none" }}>
		{resource === "events" && (
				// New Event Wizard
				<NewEventWizard close={close} />
			)}
			{resource === "series" && (
				// New Series Wizard
				<NewSeriesWizard close={close} />
			)}
			{resource === "themes" && (
				// New Theme Wizard
				<NewThemeWizard close={close} />
			)}
			{resource === "acl" && (
				// New ACL Wizard
				<NewAclWizard close={close} />
			)}
			{resource === "group" && (
				// New Group Wizard
				<NewGroupWizard close={close} />
			)}
			{resource === "user" && (
				// New User Wizard
				<NewUserWizard close={close} />
			)}
			</div>
		{mode === "confirm" && (
		<div style={{ padding: "1rem" }}>
			<p>Are you sure you want to close? Your changes will be lost.</p>
			<div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
				<button
					style={{ backgroundColor: "red", color: "white", padding: "0.5rem 1rem" }}
					onClick={confirmClose}
				>
					Yes, Close
				</button>
				<button
					style={{ backgroundColor: "gray", color: "white", padding: "0.5rem 1rem" }}
					onClick={cancelClose}
				>
					No, Go Back
				</button>
			</div>
		</div>
	)}
		</Modal>
	);
};

export default NewResourceModal;
