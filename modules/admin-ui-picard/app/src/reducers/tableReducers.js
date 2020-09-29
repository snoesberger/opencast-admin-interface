import {
    LOAD_RESOURCE_INTO_TABLE,
    LOAD_COLUMNS,
    SELECT_ROW,
    DESELECT_ALL,
    SORT_TABLE,
    RESET_SORT_TABLE,
    SELECT_ALL,
    REVERSE_TABLE,
    SET_SORT_BY,
    SET_MULTISELECT,
    CREATE_PAGE,
    UPDATE_PAGESIZE,
    SET_OFFSET,
    SET_TOTAL_ITEMS,
    SET_PAGES, SET_DIRECT_ACCESSIBLE_PAGES, SET_PAGE_ACTIVE,
} from "../actions/tableActions";

/*
Overview of the structure of the data in arrays in state
const pages = [{
  active: false,
  label: "",
  number: 1
}, ...]

const rows = [{
    id: 1,
    data: [{for each column a value}]
}, ...]

const columns = [{
    style: "",
    deactivated: true,
    name: "",
    sortable: false,
    label: "",
    translate: false,
    template: ""
}, ...]
 */

/**
 * This file contains redux reducer for actions affecting the state of table
 */

// Initial state of table in redux store
const initialState = {
    loading: false,
    multiSelect: false,
    resource: "",
    pages: [],
    columns: [],
    sortBy: "",
    predicate: "",
    reverse: "ASC",
    rows: [],
    maxLabel: "",
    pagination: {
        limit: 10,
        offset: 0,
        totalItems: 0,
        directAccessibleNo: 3
    }
};


// Reducer for table
const table = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_RESOURCE_INTO_TABLE: {
            const { multiSelect, columns, resource, pages, rows, sortBy } = payload;
            return {
                ...state,
                multiSelect: multiSelect,
                columns: columns,
                resource: resource,
                rows: rows,
                pages: pages,
                sortBy: sortBy,
                pagination: {
                    ...state.pagination,
                    totalItems: rows.length
                }
            }
        }
        case LOAD_COLUMNS: {
            return state;
        }
        case SELECT_ROW: {
            const { id } = payload;
            return {
                ...state,
                rows: state.rows.map(row => {
                    if (row.id === id) {
                        return {
                            ...row,
                            selected: !row.selected
                        }
                    }
                    return row;
                })
            }
        }
        case SELECT_ALL: {
            console.log("SELECT_ALL");
           return {
               ...state,
               rows: state.rows.map(row => {
                   return {
                       ...row,
                       selected: true
                   }
               })
           }
        }
        case DESELECT_ALL: {
            console.log("DESELECT_ALL");
            return {
                ...state,
                rows: state.rows.map(row => {
                    return {
                        ...row,
                        selected: false
                    }
                })
            }
        }
        case SORT_TABLE: {
            //todo: maybe some adjustments necessary, when actually implementing this
            return state;
        }
        case RESET_SORT_TABLE: {
            //todo: maybe some adjustments necessary, when actually implementing this
            return state;
        }
        case REVERSE_TABLE: {
            const { order } = payload;
            return {
                ...state,
                reverse: order
            };
        }
        case SET_SORT_BY: {
            const { column } = payload;
            return {
                ...state,
                sortBy: column
            }
        }
        case SET_MULTISELECT: {
            //todo: maybe some adjustments necessary, when actually implementing this
            return state;
        }
        case CREATE_PAGE: {
            const { page } = payload;
            return {
                ...state,
                pages: state.pages.concat(page)
            }
        }
        case UPDATE_PAGESIZE: {
            const { limit } = payload;
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    limit: limit
                }
            }
        }
        case SET_PAGES: {
            const { pages } = payload;
            return {
                ...state,
                pages: pages
            }
        }
        case SET_TOTAL_ITEMS: {
            const { totalItems } = payload;
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    totalItems: totalItems
                }
            }
        }
        case SET_OFFSET: {
            const { offset } = payload;
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    offset: offset
                }
            }
        }
        case SET_DIRECT_ACCESSIBLE_PAGES: {
            const { directAccessible } = payload;
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    directAccessibleNo: directAccessible
                }
            }
        }
        case SET_PAGE_ACTIVE: {
            const { pageNumber } = payload;
            return {
                ...state,
                pages: state.pages.map(page => {
                    if (page.number === pageNumber) {
                        return {
                            ...page,
                            active: true
                        }
                    } else {
                        return {
                            ...page,
                            active: false
                        }
                    }
                })
            }
        }
        default:
            return state;
    }
};

export default table;
