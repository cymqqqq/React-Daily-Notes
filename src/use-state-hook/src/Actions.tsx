import styled from "styled-components";
import { ItemType } from "./useItems";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    wordsPerSentence: {
        max: 6,
        min: 2
    }
});

type Props = {
    totalItems: number;
    addItem: (item: Pick<ItemType, "text">) => void;
    toggleAllItemsCompleted: () => void;
};

const Container = styled("div")`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
    margin-right: 8px;
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
    const { totalItems, addItem, toggleAllItemsCompleted } = props;

    return (
        <Container>
            <Button
                onClick = {() =>
                    addItem({
                        text: lorem.generateWords()
                    })
                }
            >
                Add Item
            </Button>
            {
                totalItems > 1 && (
                    <Button className="outlined" onClick={() => toggleAllItemsCompleted()}>
                        Toggle All
                    </Button>
                )
            }
        </Container>
    );
};

export default Actions;
