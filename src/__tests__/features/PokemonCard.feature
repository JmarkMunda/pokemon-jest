Feature: Pokemon Card Component

  Scenario: Render Pokemon Card
    Given the card components is rendered
    When the card component is rendered with specific Pokemon data
    Then the pokemon's name should be visible on the card
    And the pokemon's image should be displayed on the card
    When the card component is pressed
    Then navigate to the details screen
