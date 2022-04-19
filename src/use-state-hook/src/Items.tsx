import { ItemType } from "./useItems";
import styled from "styled-components";

type Props = {
    items: ItemType[];
    setItemCompleted: (itemIndex: number, completed: boolean) => void;
};

const Container = styled("div")`
    display: flex;
    flex-wrap: wrap;
`;

const Item = styled("div")`
    margin: 8px;
    padding: 8px;
    border: 1px solid #a7a7a7;
    cursor: pointer;
    color: #001a3a;
    font-size: 18px;
    text-transform: capitalize;

    &:hover {
        box-shadow: 0px 0px 3px 1px #b9b9b9;
    }

    &.completed {
        opacity: 0.75;
        text-decoration: line-through;
        color: #9f9f9f;
    }
`;

const Items = (props: Props) => {
    const { items, setItemCompleted} = props;
    return (
        <Container>
            {
                items.map(({ text, completed}, i) => (
                    <Item 
                        key={i}
                        className={completed ? "completed": ""}
                        onClick={() => setItemCompleted(i, !completed)}
                    >
                        {text}
                    </Item>
                ))
            }

        </Container>
    );
};

export default Items;