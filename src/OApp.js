import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';


function RecipeGenerator() {
  const [json, setJson] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);


  useEffect(() => {
    const savedRecipeString = localStorage.getItem('savedRecipes');
    if (savedRecipeString) {
      const parsedSavedRecipes = JSON.parse(savedRecipeString);
      setSavedRecipes(parsedSavedRecipes);
    }
  }, []);
  

  const generateRecipe = () => {
    try {
      const jsonData = JSON.parse(json);
      let recipeData;
  
      if (Array.isArray(jsonData)) {
        recipeData = jsonData.find((item) => item['@type'] === 'Recipe');
      } else {
        recipeData = jsonData;
      }
  
      if (!recipeData || recipeData['@type'] !== 'Recipe') {
        alert('The JSON object must be of type "Recipe"');
        return;
      }
  
      const newRecipe = {
        title: recipeData.name,
        author: recipeData.author['name'],
        description: recipeData.description,
        image: recipeData.image[0],
        totalTime: recipeData.totalTime,
        recipeYield: recipeData.recipeYield,
        recipeCuisine: recipeData.recipeCuisine,
        recipeCategory: Array.isArray(recipeData.recipeCategory)
          ? recipeData.recipeCategory.join(', ')
          : recipeData.recipeCategory,
        keywords: Array.isArray(recipeData.keywords)
          ? recipeData.keywords.join(', ')
          : recipeData.keywords,
        nutrition: recipeData.nutrition,
        ingredients: recipeData.recipeIngredient,
        instructions: recipeData.recipeInstructions.map((step) => step.text),
      };
  
      const updatedSavedRecipes = [...savedRecipes, newRecipe];
      setRecipe(newRecipe);
      setSavedRecipes(updatedSavedRecipes);
      localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const clearRecipe = () => {
    setRecipe(null);
  };
  const loadRecipe = (savedRecipe) => {
    const loadedRecipe = {
      title: savedRecipe.title,
      author: savedRecipe.author,
      description: savedRecipe.description,
      image: savedRecipe.image,
      totalTime: savedRecipe.totalTime,
      recipeYield: savedRecipe.recipeYield,
      recipeCuisine: savedRecipe.recipeCuisine,
      recipeCategory: Array.isArray(savedRecipe.recipeCategory)
        ? savedRecipe.recipeCategory.join(', ')
        : savedRecipe.recipeCategory,
      keywords: Array.isArray(savedRecipe.keywords)
        ? savedRecipe.keywords.join(', ')
        : savedRecipe.keywords,
      nutrition: savedRecipe.nutrition,
      ingredients: savedRecipe.ingredients,
      instructions: savedRecipe.instructions,
    };
  
    setRecipe(loadedRecipe);
  };
  
  

  const clearSavedRecipes = () => {
    setSavedRecipes([]);
    localStorage.removeItem('savedRecipes');
  };

  const handleDeleteRecipe = (index) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const updatedSavedRecipes = savedRecipes.filter((_, i) => i !== index);
      setSavedRecipes(updatedSavedRecipes);
      localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
    }
  };
  

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="jsonTextArea">
              <Form.Label>Paste your JSON here:</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={json}
                onChange={(e) => setJson(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={generateRecipe}>
              Generate Recipe
            </Button>{' '}
            {recipe && (
              <Button variant="danger" onClick={clearRecipe}>
                Clear Recipe
              </Button>
            )}
          </Form>
          {savedRecipes.length > 0 && (
            <div>
              <h3>Saved Recipes</h3>
              <ListGroup>
  {savedRecipes.map((recipe, index) => (
    <div
    key={index}
    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
    onClick={() => loadRecipe(recipe)}
    style={{ cursor: "pointer" }}
  >
    {recipe.title} by {recipe.author}
    <Button
      variant="danger"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteRecipe(index);
      }}
    >
      [x]
    </Button>
  </div>
  
  
  
  ))}
</ListGroup>


              <Button variant="danger" onClick={clearSavedRecipes}>
                Clear Saved Recipes
              </Button>
            </div>
          )}
        </Col>
        {recipe && (
          <Col>
            <h2>{recipe.title}</h2>
    <p>by {recipe.author}</p>
            <img src={recipe.image} alt={recipe.title} className="img-fluid" />
            <p>{recipe.description}</p>
            <ul>
              <li>Total Time: {recipe.totalTime}</li>
              <li>Yield: {recipe.recipeYield}</li>
              
            </ul>
            <h4>Ingredients</h4>
    <ul>
      {recipe.ingredients &&
        recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
    </ul>
    <h4>Instructions</h4>
    <ol>
      {recipe.instructions &&
        recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
    </ol>
          </Col>
        )}
      </Row>
    </Container>
  );
}
export default RecipeGenerator;