import { useEffect } from "react";
import store, { useAppDispatch } from "../store";
import { resetCorruptedState } from "../slices/tableFilterSlice";

/**
 * Custom hook to validate and fix corrupted table filter state in localStorage.
 * This hook should be used in components that rely on table filter state to ensure
 * the state is valid before using it.
 */
export const useTableFilterStateValidation = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		// Check for corrupted state and dispatch reset action if needed
		const tableFilters = store.getState().tableFilters;

		const hasCorruption =
			!Array.isArray(tableFilters.data) ||
			!Array.isArray(tableFilters.textFilter) ||
			!Array.isArray(tableFilters.stats);

		if (hasCorruption) {
			console.warn("Detected corrupted table filter state, resetting to defaults");
			dispatch(resetCorruptedState());
		}
	}, [dispatch]);
};
