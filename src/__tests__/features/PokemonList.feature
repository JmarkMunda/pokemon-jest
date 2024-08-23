Feature: Pokemon List

  Scenario: Render List Screen
    Given I am on the list screen
    When I rendered the List Screen
    Then I should see the Search Bar
    Then I should see the Pokemon List
    When I successfully loaded the data
    Then I should see the list of pokemon cards
    When I scroll down to the bottom end of the list
    Then it should load more data until there is no more
    When I type a name of pokemon in the searchbar
    Then I should update the search query state
    Then I should trigger the search
