Feature: Pokemon Details

  Scenario: Render Details Screen with Pokemon Data
    Given I am on the Pokemon Details screen
    When I load the Pokemon Details
    Then I should see the pokemon's name
    And I should see the pokemon's image
    And I should see the pokemon's stats
    And I should see the pokemon's types
