import styled from "styled-components";
import { Action } from "./use-items";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    wordsPerSentence: {
        max: 6,
        min: 2
    }
});

type Props = {
    totalItems: number;
    dispatch: React.Dispatch<Action>;
};

const Container = styled("div")`
    display: flex;
    flex-wrap: wrap;
    aligh-items: center;
    margin: 0px 16px;
`;

const Button = styled("button")`
    border-radius: 4px;
    border: none;
    font-size: 14px;
    height: 30px;
    background-color: #3453e5;
    color: white;
    padding: 0px 12px;
    margin-right: 0px;
    cursor: pointer;

    :active {
        opacity: 0.9;
        transform: scale(1.05);
    }

    &.outlined {
        border: 1px solid #3453e5;
        background: none;
        color: #3453e5;
    }
`;

const Actions = (props: Props) => {
    const { totalItems, dispatch } = props;

    return (
        <Container>
            <Button
                onClick={() => 
                dispatch({
                    type: "ADD_ITEM",
                    data: {
                        item: {
                            text: lorem.generateWords()
                        }
                    }
                })}
            >
                Add Item
            </Button>
            {totalItems > 1 && (
                <Button
                    className="outlined"
                    onClick={() => dispatch({ type: "TOGGLE_ALL_ITEMS_COMPLETED" })}
                >
                    Toggle All
                </Button>
            )}
        </Container>
    );
};

export default Actions;