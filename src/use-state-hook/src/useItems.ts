import { useState, useCallback } from "react";

export type ItemType = {
    text: string;
    completed?: boolean;
};

const useItems = () => {
    const [items, setItems] = useState<ItemType[]>([]);
    const addItem = useCallback(
        (item: Pick<ItemType, "text">) => 
        
        setItems((prevItems) => [item, ...prevItems]),
        []  
    );

    const setItemCompleted = useCallback(
        (itemIndex: number, completed: boolean) =>
        setItems((prevItems) => 
        prevItems.map((item, i) =>
        i === itemIndex ? {...item, completed} : item)), []
    );

    const toggleAllItemsCompleted = () => {
        const areAllCompleted = 
        items.length > 0 &&
        items.filter(({ completed }) => !completed).length === 0;
        setItems((prevItems) => 
        prevItems.map((item) => ({...item, completed: !areAllCompleted}))
        );
        
    };

    return {
        items,
        addItem,
        setItemCompleted,
        toggleAllItemsCompleted
    };
};

export default useItems;