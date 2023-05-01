import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [recipe, setRecipe] = useState(null);

  const handleJsonDataChange = (e) => {
    setJsonData(e.target.value);
  };

  const generateRecipe = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      setRecipe(parsedData);
    } catch (error) {
      console.error('Invalid JSON');
    }
  };

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>Recipe Generator</h1>
          <Form.Group controlId="jsonTextArea">
            <Form.Label>Paste JSON here</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={jsonData}
              onChange={handleJsonDataChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={generateRecipe}>
            Generate
          </Button>
        </Col>
      </Row>
      {recipe && (
        <Row>
          <Col>
            <Card>
             
              <Card.Body>
                <Card.Title>{recipe.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
  {recipe.author && recipe.author.name && `By ${recipe.author.name}`}
</Card.Subtitle>
                <Card.Text>{recipe.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  Ingredients
                </Card.Subtitle>
                <ul>
                  {recipe.recipeIngredient.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <Card.Subtitle className="mb-2 text-muted">Steps</Card.Subtitle>
                <ol>
                  {recipe.recipeInstructions.map((instruction, index) => (
                    <li key={index}>{instruction.text}</li>
                  ))}
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;

// 