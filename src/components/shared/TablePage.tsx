import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import TableFilters from "../shared/TableFilters";
import Table, { TemplateMap } from "../shared/Table";
import Notifications from "../shared/Notifications";
import { CreateType, NavBarLink } from "../NavBar";
import { AppThunk, RootState, useAppSelector } from "../../store";
import { Resource } from "../../slices/tableSlice";
import { AsyncThunk } from "@reduxjs/toolkit";
import { ParseKeys } from "i18next";
import MainPage from "./MainPage";

/**
 * This component renders a generic page with a table
 */
const TablePage = ({
	resource,
	fetchResource,
	loadResourceIntoTable,
	getTotalResources,
	navBarLinks,
	navBarCreate,
	caption,
	templateMap,
	navBarChildren,
	children,
}: {
	resource: Resource
	fetchResource: AsyncThunk<any, void, any>,
	loadResourceIntoTable: () => AppThunk,
	getTotalResources: (state: RootState) => number,
	navBarLinks: NavBarLink[]
	navBarCreate?: CreateType
	navBarChildren?: ReactNode
	caption: ParseKeys
	templateMap: TemplateMap
	children?: ReactNode
}) => {
	const { t } = useTranslation();

	const numberOfRows = useAppSelector(state => getTotalResources(state));

	return (
		<MainPage
			navBarLinks={navBarLinks}
			navBarCreate={navBarCreate}
			navBarChildren={navBarChildren}
		>
				{/* Include notifications component */}
				<Notifications context={"other"}/>

				<div className="controls-container">
					<div className="filters-container">
						{children}

						{/* Include filters component */}
						<TableFilters
							loadResource={fetchResource}
							loadResourceIntoTable={loadResourceIntoTable}
							resource={resource}
						/>
					</div>
					<h1>{t(caption)}</h1>
					<h4>{t("TABLE_SUMMARY", { numberOfRows })}</h4>
				</div>
				{/* Include table component */}
				<Table
					templateMap={templateMap}
					fetchResource={fetchResource}
					loadResourceIntoTable={loadResourceIntoTable}
				/>
		</MainPage>
	);
};

export default TablePage;
