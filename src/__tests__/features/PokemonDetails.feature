Feature: Pokemon Details

  Scenario: Navigating to the Pokemon Details
    Given I am on the Pokemon Details screen
    When the Pokemon Details have finished loading
    Then I should see the pokemon's name
    And I should see the pokemon's image
    And I should see the pokemon's types
