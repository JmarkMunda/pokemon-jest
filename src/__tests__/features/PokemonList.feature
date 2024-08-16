Feature: Pokemon List

  Scenario: Render Pokemon List
    Given I am on the pokemon list screen
    When the data is successfully loaded
    Then it should display the list
    When I scroll down to the bottom end of the list
    Then it should load more data until there is no more
