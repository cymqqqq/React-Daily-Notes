import { useReducer } from "react";

export type ItemType = {
    text: string;
    completed?: boolean;
};

type State = {
    items: ItemType[];
};

export type Action = 
    | {
        type: "ADD_ITEM";
        data: {
            item: Pick<ItemType, "text">;
        };
    }
    | {
        type: "SET_ITEM_COMPLETED";
        data: { itemIndex: number; completed: boolean;}
    }
    | { type: "TOGGLE_ALL_ITEMS_COMPLETED" };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_ITEM": {
            const { item } = action?.data;
            return {
                ...state,
                items: [item, ...state.items]
            };
        }
        case "SET_ITEM_COMPLETED": {
            const { itemIndex, completed } = action?.data;
            return {
                ...state,
                items: state?.items.map((item, i) => 
                i === itemIndex ? { ...item, completed } : item
                )
            };
        }
        case "TOGGLE_ALL_ITEMS_COMPLETED": {
            const currentItems = state?.items ?? [];
            const areAllCompleted = 
                currentItems.length > 0 &&
                currentItems.filter(({ completed }) => !completed).length === 0;
            return {
                ...state,
                items: currentItems.map((item) => ({
                    ...item,
                    completed: !areAllCompleted
                }))
            };
        }
        default: 
            throw new Error();
    }
};

const useItems = () => {
    const [state, dispatch ] = useReducer(reducer, { items: [] });

    return {
        state,
        dispatch
    };
};

export default useItems;