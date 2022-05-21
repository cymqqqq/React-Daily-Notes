import Card from "./components/Card";

function App() {
    return (
        <div style={appStyle}>
            <Card>
                <Card.Header>header</Card.Header>
                <Card.Body>body</Card.Body>
                <Card.Footer>footer</Card.Footer>
            </Card>
        </div>
    );
}

export default App;