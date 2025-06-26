import React, { JSX } from "react";
import { useTranslation } from "react-i18next";
import { getUserInformation } from "../../selectors/userInfoSelectors";
import { useAppSelector } from "../../store";
import { hasAccess } from "../../utils/utils"
import { Tooltip } from "./Tooltip";
import cn from "classnames";
import { ParseKeys } from "i18next";

type ButtonLikeAnchorProps = JSX.IntrinsicElements["button"] & {
	editAccessRole?: string
	tooltipText?: ParseKeys
}

const ButtonLikeAnchor = React.forwardRef<HTMLButtonElement, ButtonLikeAnchorProps>(({
	editAccessRole,
	tooltipText,
	children,
	...rest
}, ref) => {

	const { t } = useTranslation();

	const user = useAppSelector(state => getUserInformation(state));

	if (editAccessRole && !hasAccess(editAccessRole, user)) {
		return (<></>);
	}

	const buttonComponent = (
		<button
			ref={ref}
			type="button"
			{...rest}
			className={cn("button-like-anchor", rest.className)}
		>
			{children}
		</button>
	);

	if (tooltipText) {
		return (
			<Tooltip title={t(tooltipText)}>
				{buttonComponent}
			</Tooltip>
		);
	}

	return buttonComponent;
});

export default ButtonLikeAnchor;
