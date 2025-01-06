export type TableState = {
    records: {
        id: string;
        mode: string;
        origin: string;
        destination: string;
        status: string;
        total: string;
        type: string;
        userId: string;
        name: string;
    }[];
    totalRecords: number;
    isLoadingRecords: boolean;
    errorMessage: string;
    paginationModel: {
        page: number;
        limit: number;
    };
    query: string;
};

export type FetchRecordsArgType = {
    page: number; limit: number; query: string;
};

export type UpdatePaginationModelActionType = {
    payload: Partial<TableState["paginationModel"]>;
};

export type UpdateFilterActionType = {
    payload: FetchRecordsArgType;
}

export type UpdateQueryActionType = { payload: { query: string } };

export type PaginationProps = {
    onChange: (p: number) => void;
    currentPage: number;
    totalRecords: number;
    limit: number;
};

export type ShipmentType = TableState["records"][number];
