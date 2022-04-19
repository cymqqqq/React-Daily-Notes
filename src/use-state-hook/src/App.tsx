import useItems from "./useItems";
import Items from "./Items";
import styled from "styled-components";
import Actions from "./Actions";

const AppContainer = styled("div")`
    font-family: sna-serif;
    margin: 16px;
`;

const TitleContainer = styled("div")`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const Empty = styled("p")`
    font-style: italic;
`;

const CompletedContainer = styled("div")`
    text-align: right;
    font-weight: 500;
`;

export const App = () => {
    const {
        items,
        addItem,
        setItemCompleted,
        toggleAllItemsCompleted
    } = useItems();

    const totalCompleted = 
    items.filter(({ completed }) => completed)?.length ?? 0;

    return (
        <AppContainer>
            <TitleContainer>
                <h3>Your Items</h3>
                <Actions
                    totalItems={items.length}
                    addItem={addItem}
                    toggleAllItemsCompleted={toggleAllItemsCompleted}
                />

            </TitleContainer>
            <CompletedContainer>
                Completed: {totalCompleted}/{items.length}
            </CompletedContainer>
            {items.length === 0 ? (
                <Empty>Add items by clicking the button above...</Empty>
            ): (
                <Items items={items} setItemCompleted={setItemCompleted}
                />
            )}
        </AppContainer>
    )
}