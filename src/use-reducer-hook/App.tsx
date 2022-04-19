import useItems from "./use-items";
import Items from "./items";
import styled from "styled-components";
import Actions from "./Actions";

const AppContainer = styled("div")`
    font-family: sans-serif;
    margin: 16px;
`;

const TitleContainer = styled("div")`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const CompletedContainer = styled("div")`
    text-align: right;
    font-weight: 500;
`;

const Empty = styled("p")`
    font-style: italic;
`;

export default function App() {
    const { state, dispatch }  = useItems();
    const { items } = state;

    const totalCompleted = 
        items.filter(({ completed }) => completed)?.length ?? 0;
    
    return (
        <AppContainer>
            <TitleContainer>
                <h3>Your Items</h3>
                <Actions totalItems={items.length} dispatch={dispatch} />
            </TitleContainer>
            <CompletedContainer>
                completed: {totalCompleted}/{items.length}
            </CompletedContainer>
            {items.length === 0 ? (
                <Empty>Add items by clicking the button above...</Empty>
            ) : (
                <Items items={items} dispatch={dispatch}/>
            )}
        </AppContainer>
    );
}